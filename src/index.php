<?php 
require "example-runner/utils.php";
require "includes/html-helpers.php";
define('HOMEPAGE', true);
// variable necessary in navbar.php
$version = 'latest';
?>
<!DOCTYPE html>
<html lang="en">
<head>
<?php
$title = 'ag-Grid: The Best HTML5 Datagrid in the World';
$keywords = 'javascript data grid react angularjs angular 2 web components aurelia';
$description = 'ag-Grid is a feature-rich datagrid available in Free or Enterprise versions. Easily integrate with your framework to deliver filtering, grouping, aggregation, pivoting and much more. Version 16 just released.';
meta_and_links($title, $keywords, $description, false);
?>
<link rel="stylesheet" href="dist/homepage.css">
</head>

<body>
    <header id="nav">
        <?php include 'includes/navbar.php' ?>

        <section id="punch">
            <div id="doodle-container">
                <div id="doodle-misc"><img inline src="_assets/doodles/misc.svg" /></div>
                <div id="doodle-checkbox-selection"><img inline src="_assets/doodles/checkbox-selection.svg" /></div>
                <div id="doodle-context-menu"><img inline src="_assets/doodles/context-menu.svg" /></div>
                <div id="doodle-editing"><img inline src="_assets/doodles/editing.svg" /></div>
                <div id="doodle-range-selection"><img inline src="_assets/doodles/range-selection.svg" /></div>
                <div id="doodle-quick-filter"><img inline src="_assets/doodles/quick-filter.svg" /></div>
                <div id="doodle-tree-data"><img inline src="_assets/doodles/tree-data.svg" /></div>
                <div id="doodle-column-menu"><img inline src="_assets/doodles/column-menu.svg" /></div>
            </div>

            <div>
                <h2 title="ag-Grid">THE BEST
                    <br>
                    HTML5 GRID
                    <br>
                    IN THE WORLD
                </h2>

                <ul id="homepage-highlights">
                    <li>
                        Over <strong>1,000</strong> Companies
                        use ag-Grid Enterprise.
                    </li>

                    <li>
                        Over <strong>15%</strong> of the Fortune 500
                        use ag-Grid Enterprise.
                    </li>

                    <li>
                        Over <strong>140,000</strong> 
                        Downloads per month.
                    </li>
                </ul>

                <a href="/javascript-grid-getting-started/" id="free-cta">Use Free Version</a>
                <a href="/start-trial.php" id="enterprise-cta">Try Enterprise Version</a>
            </div>
        </section>
    </header>

    <div id="stage-frameworks">
        <section id="news-flash">
            <div>
                January 24th, 2018: Version 16 released featuring Row Drag & Drop and Locked Columns. <a href="/ag-grid-blog-16-0-0/">See what is new</a>.
            </div>
        </section>

        <section id="section-frameworks">
            <div>
                <h2>
                    Works With All<br />
                    Major JavaScript<br />
                    Frameworks<br />
                    <small></small>
                </h2>
                <p>With Zero Dependencies.</p>
            </div>

            <div>
                <ul id="frameworks">
                    <li id="fw-angular"><a href="./best-angular-2-data-grid/">Angular</a></li>
                    <li id="fw-react"><a href="./best-react-data-grid/">React</a></li>
                    <li id="fw-polymer"><a href="./best-polymer-data-grid/">Polymer</a></li>
                    <li id="fw-vue"><a href="./best-vuejs-data-grid/">Vue.js</a></li>
                    <li id="fw-javascript"><a href="./best-javascript-data-grid/">JavaScript</a></li>
                    <li id="fw-angularjs"><a href="./best-angularjs-data-grid/">AngularJS 1.x</a></li>
                    <li id="fw-aurelia"><a href="./best-aurelia-data-grid/">Aurelia</a></li>
                    <li id="fw-webcomponents"><a href="./best-web-component-data-grid/">Web Components</a></li>
                </ul>
            </div>
        </section>
    </div>



    <div class="stage-scenarios">
        <h2 class="heading-scenarios">Complex Scenarios, Made Easy </h2>

        <section>
            <div class="demo">
                <?php include 'home/demo-1.php' ?>
                <div class="view-code">
                    <a href="/javascript-getting-started#summary">View Code</a>
                </div>
            </div>
        </section>
    </div>

    <div id="stage-sponsorships">
        <section id="sponsorships">
            <div>
                <h2>Supporting Open Source</h2>
                <h3>We are proud to sponsor the tools we use and love.</h3>
            </div>

            <div>
                <div class="media">
                    <img src="_assets/fw-logos/webpack.svg" />
                    <div class="media-body">
                        <h3>Webpack</h3>
                        <p><a href="/ag-grid-partners-with-webpack/">Read about our Partnership with webpack.</a></p>
                    </div>
                </div>

                <div class="media">
                    <img src="_assets/fw-logos/plunker.svg" />
                    <div class="media-body">
                        <h3>Plunker</h3>
                        <p><a href="/ag-grid-proud-to-support-plunker/">Read about our Backing of Plunker.</a></p>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <div class="stage-scenarios">
        <h2 class="heading-scenarios">Live Streaming Updates</h2>

        <section>
            <div class="demo">
                <?php include 'home/demo-2.php' ?>
                <div class="view-code">
                    &nbsp;
                </div>
            </div>
        </section>
</div>


    <div id="stage-testimonials">
        <section>
            <div>
                <img src="_assets/customers/robin-cote.jpg" alt="Andrew Taft">
                <div>
                    <blockquote>
                        <p>Remarkable speed and extensibility, ag-Grid is the best web feature-rich BI tool on the market.</p>

                        <footer>
                            <strong>Robin Cote</strong>
                            <span class="position">Senior Systems Developer, Investment Solutions Group, Healthcare of Ontario Pension Plan</span> 
                        </footer>
                    </blockquote>
                </div>
            </div>

            <div>
                <img src="_assets/customers/andrew-taft.jpg" alt="Andrew Taft">
                <div>
                    <blockquote>
                        <p>We’re using <strong>ag-Grid</strong> as a major component in our enterprise analytics and reporting product and it’s incredible. Prior to <strong>ag-Grid</strong>, we tried jqGrid, jqxGrid, DataTables, and SlickGrid, which all have their strong points, but we eventually ran into a wall with certain features. <br><br>
                            <strong>ag-Grid</strong>’s grouping, aggregation, filtering, and all-around flexibility allowed us to quickly integrate it into our product. And, the performance is truly awesome!</p>

                        <footer>
                            <!--img src="./assets/customers/andrew-taft.jpg" alt="Andrew Taft" /-->
                            <strong>Andrew Taft</strong> 
                            <span class="position">Head of Product Development at Insight Technology Group</span> 
                        </footer>
                    </blockquote>
                </div>
            </div>

            <div>
                <img src="_assets/customers/jason-boorn.jpg" alt="Jason Boorn">

                <div>
                    <blockquote>
                        <p>We just made the move from Kendo to ag-Grid and we love it. It’s fast and very flexible.</p>

                        <footer>
                            <strong>Jason Boorn</strong>
                            <span class="position">Senior Architect, Roobricks</span>
                        </footer>
                    </blockquote>
                </div>
            </div>

        </section>
    </div>

    <div class="stage-scenarios">
        <h2 class="heading-scenarios">Developer Friendly API</h2>

        <section>
            <div class="demo">
                <?php include 'home/demo-api.php' ?>
                <div class="view-code">
                    <a href="/javascript-grid-animation/">View Code</a>
                </div>
            </div>
        </section>
    </div>

    <div id="stage-feature-highlights">
        <h2>Feature Highlights</h2>

        <div id="feature-content">
            <aside>
                <div class="scroll-wrapper">
                </div>
            </aside>
            <section>
            <?php include 'roadshow/roadshow.php' ?>
            </section>
        </div>
    </div>

    <?= globalAgGridScript(true) ?>
    <script src="dist/homepage.js"></script>
    <?php include 'includes/footer.php' ?>
</body>
</html>
