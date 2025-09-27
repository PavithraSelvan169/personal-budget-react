import React from 'react';


function HomePage() {
    return (
        <main role="main" className="center" id="main">

            <div className="page-area">

                <article>
                     
                    <h2>Stay on track</h2>
                    <p>
                        Do you know where you are spending your money? If you really stop to track it down,
                        you would get surprised! Proper budget management depends on real data... and this
                        app will help you with that!
                    </p>
                </article>

                <article>
                    <h2>Alerts</h2>
                    <p>
                        What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                    </p>
                </article>

                <article>
                    <h2>Results</h2>
                    <p>
                        People who stick to a financial plan, budgeting every expense, get out of debt faster!
                        Also, they to live happier lives... since they expend without guilt or fear...
                        because they know it is all good and accounted for.
                    </p>
                </article>

                <article>
                    <h2>Free</h2>
                    <p>
                        This app is free!!! And you are the only one holding your data!
                    </p>
                </article>

                

                <article>
                    <h2>Stay on track</h2>
                    <p>
                        Do you know where you are spending your money? If you really stop to track it down,
                        you would get surprised! Proper budget management depends on real data... and this
                        app will help you with that!
                    </p>
                </article>

                <article>
                    <h2>Alerts</h2>
                    <p>
                        What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                    </p>
                </article>

                <article>
                    <h2>Results</h2>
                    <p>
                        People who stick to a financial plan, budgeting every expense, get out of debt faster!
                        Also, they to live happier lives... since they expend without guilt or fear...
                        because they know it is all good and accounted for.
                    </p>
                </article>

                <article>
                    <h2>Chart</h2>
                    
                  
                        <figure>
                            <canvas id="myChart" width="800" height="800" aria-label="Personal Budget Chart"></canvas>

                            <figcaption className="chartcaption">A pie chart displaying budget categories and their allocations.
                            </figcaption>

                        </figure>
                        
                </article>

                <article>

                </article>

            </div>
            <div >
                <h2>D3 Chart</h2>
                <figure id="d3-chart-container" aria-label="Personal Budget D3 Chart">
                    
                    <figcaption className="chartcaption">
                        D3 pie chart
                    </figcaption>
                </figure>
            </div>

        </main>
    );
}

export default HomePage;