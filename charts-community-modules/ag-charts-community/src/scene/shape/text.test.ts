import { describe, expect, it } from '@jest/globals';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

import type { TextWrap } from '../../chart/agChartOptions';
import { setupMockCanvas, extractImageData } from '../../chart/test/utils';
import type { LayerManager } from '../node';
import { Text } from './text';

expect.extend({ toMatchImageSnapshot });

function setUpMockLayerManager(canvasCtx): LayerManager {
    return {
        debug: {} as any,
        canvas: canvasCtx.nodeCanvas,
        markDirty: () => {},
        addLayer: () => undefined,
        moveLayer: () => {},
        removeLayer: () => {},
    };
}

const BASE_OPTIONS = {
    textAlign: 'start' as CanvasTextAlign,
    fontSize: 15,
    fontFamily: 'sans-serif',
    textBaseline: 'top' as CanvasTextBaseline,
};

describe('Text', () => {
    describe('rendering', () => {
        const canvasCtx = setupMockCanvas();
        const mockLayerManager = setUpMockLayerManager(canvasCtx);

        const GAP = 20;

        const TEST_CASES: (Partial<Text> | undefined)[][] = [
            [
                {
                    ...BASE_OPTIONS,
                    text: 'Testing testing',
                },
                {
                    ...BASE_OPTIONS,
                    text: 'Testing a longer string',
                },
                {
                    ...BASE_OPTIONS,
                    text: 'Testing a multi-line string \n with two lines',
                },
            ],
        ];

        const WRAPPING_TEST_CASES: {
            textOptions: (Partial<Text> | undefined)[];
            maxWidth: number;
            maxHeight: number;
            truncate: boolean;
            breakWord: boolean;
            hyphens: boolean;
            x?: number;
            y?: number;
        }[] = [
            {
                maxWidth: 100,
                maxHeight: 100,
                truncate: true,
                breakWord: true,
                hyphens: true,
                textOptions: [
                    {
                        ...BASE_OPTIONS,
                        text: 'Testing wrapping',
                    },
                    {
                        ...BASE_OPTIONS,
                        text: 'Testing wrapping longer string',
                    },
                    {
                        ...BASE_OPTIONS,
                        text: 'Testing wrapping multi-line string \n with two lines',
                    },
                ],
            },
            {
                maxWidth: 50,
                maxHeight: 50,
                truncate: true,
                breakWord: true,
                hyphens: true,
                textOptions: [
                    {
                        ...BASE_OPTIONS,
                        text: 'Testing wrapping',
                    },
                    {
                        ...BASE_OPTIONS,
                        text: 'Testing wrapping longer string',
                    },
                    {
                        ...BASE_OPTIONS,
                        text: 'Testing wrapping multi-line string \n with two lines',
                    },
                ],
            },
            {
                maxWidth: 25,
                maxHeight: 25,
                truncate: true,
                breakWord: true,
                hyphens: true,
                textOptions: [
                    {
                        ...BASE_OPTIONS,
                        text: 'Testing wrapping',
                    },
                    {
                        ...BASE_OPTIONS,
                        text: 'Testing wrapping longer string',
                    },
                    {
                        ...BASE_OPTIONS,
                        text: 'Testing wrapping multi-line string \n with two lines',
                    },
                ],
            },
            {
                maxWidth: 100,
                maxHeight: 50,
                truncate: true,
                breakWord: false,
                hyphens: false,
                textOptions: [
                    {
                        ...BASE_OPTIONS,
                        text: 'Testing Sicherheitskontrolle breaking on space',
                    },
                    {
                        ...BASE_OPTIONS,
                        text: 'Testing Sicherheitskontrolle breaking on space longer string',
                    },
                    {
                        ...BASE_OPTIONS,
                        text: 'Testing Sicherheitskontrolle breaking on space \n multi-line string with two lines',
                    },
                ],
            },
            {
                maxWidth: 100,
                maxHeight: 100,
                truncate: true,
                breakWord: true,
                hyphens: true,
                textOptions: [
                    {
                        ...BASE_OPTIONS,
                        text: 'Testing Sicherheitskontrolle with hyphens',
                    },
                    {
                        ...BASE_OPTIONS,
                        text: 'Testing Sicherheitskontrolle with hyphens longer string',
                    },
                    {
                        ...BASE_OPTIONS,
                        text: 'Testing Sicherheitskontrolle with hyphens \n multi-line string with two lines',
                    },
                ],
            },
            {
                maxWidth: 100,
                maxHeight: 100,
                truncate: true,
                breakWord: true,
                hyphens: false,
                textOptions: [
                    {
                        ...BASE_OPTIONS,
                        text: 'Testing Sicherheitskontrolle without hyphens',
                    },
                    {
                        ...BASE_OPTIONS,
                        text: 'Testing Sicherheitskontrolle without hyphens longer string',
                    },
                    {
                        ...BASE_OPTIONS,
                        text: 'Testing Sicherheitskontrolle without hyphens \n multi-line string with two lines',
                    },
                ],
            },
            {
                maxWidth: 50,
                maxHeight: 50,
                truncate: false,
                breakWord: true,
                hyphens: true,
                x: 400,
                y: 0,
                textOptions: [
                    {
                        ...BASE_OPTIONS,
                        text: 'Testing wrapping without truncation',
                    },
                    {
                        ...BASE_OPTIONS,
                        text: 'Testing wrapping longer string without truncation',
                    },
                    {
                        ...BASE_OPTIONS,
                        text: 'Testing wrapping multi-line string \n with two lines without truncation',
                    },
                ],
            },
        ];

        it('should render as expected', () => {
            const ctx = canvasCtx.nodeCanvas.getContext('2d');
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.fillRect(0, 0, canvasCtx.nodeCanvas.width ?? 800, canvasCtx.nodeCanvas.height ?? 600);

            let currY = 0;
            let rowHeight = 0;
            for (const testCaseRow of TEST_CASES) {
                let currX = GAP;
                currY = currY + rowHeight + GAP;
                rowHeight = 0;

                for (const testCase of testCaseRow) {
                    const textNode = Object.assign(new Text(), testCase);

                    textNode.x = currX;
                    textNode.y = currY;
                    textNode._setLayerManager(mockLayerManager);

                    ctx.save();
                    textNode.render({ ctx, forceRender: true, resized: false, debugNodes: {} });
                    ctx.restore();

                    const { x, y, width, height } = textNode.computeBBox();

                    ctx.strokeRect(x, y, width, height);

                    currX += width + GAP;
                    rowHeight = Math.max(height, rowHeight);
                }
            }

            const imageData = extractImageData(canvasCtx);
            (expect(imageData) as any).toMatchImageSnapshot();
        });

        it('should wrap and render as expected', () => {
            const ctx = canvasCtx.nodeCanvas.getContext('2d');
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.fillRect(0, 0, canvasCtx.nodeCanvas.width ?? 800, canvasCtx.nodeCanvas.height ?? 600);

            let currY = 0;
            let rowHeight = 0;
            for (const WRAPPING_CASE in WRAPPING_TEST_CASES) {
                const testCaseRow = WRAPPING_TEST_CASES[WRAPPING_CASE];
                let currX = GAP + (testCaseRow.x ?? 0);
                currY = (testCaseRow.y ?? currY + rowHeight) + GAP;
                rowHeight = 0;

                const { maxWidth, maxHeight, truncate, breakWord, hyphens } = testCaseRow;

                for (const testCase of testCaseRow.textOptions) {
                    const textNode = Object.assign(new Text(), testCase);

                    textNode.x = currX;
                    textNode.y = currY;
                    const wrapping: TextWrap = hyphens ? 'hyphenate' : breakWord ? 'always' : 'on-space';
                    textNode.text = Text.wrap(
                        textNode.text ?? '',
                        maxWidth,
                        truncate ? maxHeight : Infinity,
                        textNode,
                        wrapping
                    );
                    textNode._setLayerManager(mockLayerManager);

                    ctx.save();
                    textNode.render({ ctx, forceRender: true, resized: false, debugNodes: {} });
                    ctx.restore();

                    const { x, y } = textNode.computeBBox();

                    ctx.strokeRect(x, y, maxWidth, maxHeight);

                    currX += maxWidth + GAP;
                    rowHeight = Math.max(maxHeight, rowHeight);
                }
            }

            const imageData = extractImageData(canvasCtx);
            (expect(imageData) as any).toMatchImageSnapshot();
        });
    });
});
