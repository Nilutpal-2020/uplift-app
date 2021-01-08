import React, {Component} from 'react';

import classes from './HabitReport.module.css';
import {Bar} from 'react-chartjs-2';

class HabitReport extends Component {
    state = {
        chartData: {
                // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'White'],
                labels: this.props.dataPoints[0],
                datasets: [
                    {
                    label: '# of Votes',
                    // data: [6, 4, 5, 3, 2, 5, 1],
                    data: this.props.dataPoints[1],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(128, 128, 128, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(128, 128, 128, 1)'
                    ],
                    borderWidth: 1,
                    },
                ],
            }
    }
    render() {
        // console.log(this.props.dataPoints);
        return (
            <div className={classes.Report} >
                <button
                    className="btn btn-outline-danger btn-sm float-right"
                    onClick={this.props.chartClose}
                    >X
                </button>
                <h2 className={classes.HeadReport}>Habit's Report</h2>
                <Bar 
                    data={this.state.chartData}
                    width={80}
                    height={60}
                    options={{
                        title: {
                            display: true,
                            text: "Weekly Report",
                            fontSize: '24'
                        },
                        legend: {
                            display: true,                          
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    suggestedMax: 6,
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}
                />
            </div>
        );
    }
}

export default HabitReport;