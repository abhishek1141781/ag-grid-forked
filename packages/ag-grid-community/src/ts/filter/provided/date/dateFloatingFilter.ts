import { Component } from "../../../widgets/component";
import { DateFilter, DateFilterModel } from "./dateFilter";
import { Autowired } from "../../../context/context";
import { UserComponentFactory } from "../../../components/framework/userComponentFactory";
import { _, Promise } from "../../../utils";
import { IDateComp, IDateParams } from "../../../rendering/dateComponent";
import { BaseFloatingFilterChange, IFloatingFilter, IFloatingFilterParams } from "../../floating/floatingFilter";
import { AbstractComparableFilter } from "../abstractComparableFilter";

export class DateFloatingFilterComp extends Component
    implements IFloatingFilter
        <DateFilterModel,
            BaseFloatingFilterChange,
            IFloatingFilterParams<DateFilterModel, BaseFloatingFilterChange>
            > {

    @Autowired('userComponentFactory') private userComponentFactory: UserComponentFactory;

    private dateComponentPromise: Promise<IDateComp>;

    private onFloatingFilterChangedFunc: (change: BaseFloatingFilterChange) => void;
    private currentParentModelFunc: () => DateFilterModel;
    private lastKnownModel: DateFilterModel = null;

    private init(params: IFloatingFilterParams<DateFilterModel, BaseFloatingFilterChange>) {

        this.onFloatingFilterChangedFunc = params.onFloatingFilterChanged;
        this.currentParentModelFunc = params.currentParentModel;
        const debounceMs: number = params.debounceMs != null ? params.debounceMs : 500;
        const toDebounce: () => void = _.debounce(this.onDateChanged.bind(this), debounceMs);
        const dateComponentParams: IDateParams = {
            onDateChanged: toDebounce,
            filterParams: params.column.getColDef().filterParams
        };
        this.dateComponentPromise = this.userComponentFactory.newDateComponent(dateComponentParams);

        const body = _.loadTemplate('<div></div>');
        this.dateComponentPromise.then(dateComponent => {
            body.appendChild(dateComponent.getGui());

            // disable the filter if inRange is the only configured option
            const columnDef = (params.column.getDefinition() as any);
            const inRangeIsOnlyOption = (columnDef.filterParams &&
                columnDef.filterParams.filterOptions &&
                columnDef.filterParams.filterOptions.length === 1 &&
                columnDef.filterParams.filterOptions[0] === 'inRange');

            if (dateComponent.eDateInput) {
                dateComponent.eDateInput.disabled = inRangeIsOnlyOption;
            }
        });

        body.style.width = '100%';
        body.style.height = '100%';

        this.setTemplateFromElement(body);
    }

    private onDateChanged(): void {
        const model = this.asParentModel();

        this.onFloatingFilterChangedFunc({
            model: model,
            apply: true
        });

        this.lastKnownModel = model;
    }

    equalModels(left: DateFilterModel, right: DateFilterModel): boolean {
        if (_.referenceCompare(left, right)) { return true; }
        if (!left || !right) { return false; }

        if (Array.isArray(left) || Array.isArray(right)) { return false; }

        return (
            _.referenceCompare(left.type, right.type) &&
            _.referenceCompare(left.dateFrom, right.dateFrom) &&
            _.referenceCompare(left.dateTo, right.dateTo) &&
            _.referenceCompare(left.filterType, right.filterType)
        );
    }

    asParentModel(): DateFilterModel {
        const filterValueDate: Date = this.dateComponentPromise.resolveNow(null, dateComponent => dateComponent.getDate());
        const filterValueText: string = _.serializeDateToYyyyMmDd(DateFilter.removeTimezone(filterValueDate), "-");

        return {
            type: null,
            dateFrom: filterValueText,
            dateTo: null,
            filterType: 'date'
        };
    }

    public onParentModelChanged(parentModel: DateFilterModel): void {
        this.lastKnownModel = parentModel;
        this.dateComponentPromise.then(dateComponent => {
            if (!parentModel || !parentModel.dateFrom) {
                dateComponent.setDate(null);
                return;
            }

            this.enrichDateInput(parentModel.type,
                parentModel.dateFrom,
                parentModel.dateTo,
                dateComponent);

            dateComponent.setDate(_.parseYyyyMmDdToDate(parentModel.dateFrom, '-'));
        });
    }

    private enrichDateInput(type: string,
                            dateFrom: string,
                            dateTo: string,
                            dateComponent: any) {
        if (dateComponent.eDateInput) {
            if (type === 'inRange') {
                dateComponent.eDateInput.title = `${dateFrom} to ${dateTo}`;
                dateComponent.eDateInput.disabled = true;
            } else {
                dateComponent.eDateInput.title = '';
                dateComponent.eDateInput.disabled = false;
            }
        }
    }
}
