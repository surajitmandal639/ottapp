import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Flattened data structure
const data = [
    { month: "January", basic_plan: 4000, premium_plan: 2400, platinum_plan: 4000, diamond_plan: 2400 },
    { month: "February", basic_plan: 3000, premium_plan: 1398, platinum_plan: 3000, diamond_plan: 1398 },
    { month: "March", basic_plan: 4000, premium_plan: 2400, platinum_plan: 4000, diamond_plan: 2400 },
    { month: "April", basic_plan: 3000, premium_plan: 1398, platinum_plan: 3000, diamond_plan: 1398 },
    { month: "May", basic_plan: 4000, premium_plan: 2400, platinum_plan: 4000, diamond_plan: 2400 },
    { month: "June", basic_plan: 3000, premium_plan: 1398, platinum_plan: 3000, diamond_plan: 1398 },
    { month: "July", basic_plan: 4000, premium_plan: 2400, platinum_plan: 4000, diamond_plan: 2400 },
    { month: "August", basic_plan: 3000, premium_plan: 1398, platinum_plan: 3000, diamond_plan: 1398 },
    { month: "September", basic_plan: 4000, premium_plan: 2400, platinum_plan: 4000, diamond_plan: 2400 },
    { month: "October", basic_plan: 3000, premium_plan: 1398, platinum_plan: 3000, diamond_plan: 1398 },
    { month: "November", basic_plan: 4000, premium_plan: 2400, platinum_plan: 4000, diamond_plan: 2400 },
    { month: "December", basic_plan: 3000, premium_plan: 1398, platinum_plan: 3000, diamond_plan: 1398 },
];

export default function MyBarChart() {
    // Extract keys from the first data entry
    const keys = data.length > 0 ? Object.keys(data[0]).filter(key => key !== "month") : [];

    // Custom Tooltip
    function CustomTooltip({ payload, label, active }) {
        if (active && payload && payload.length) {
            return (
                <div className="morris-hover morris-default-style" style={{ left: '104.647px', top: '89px', display: 'block' }}>
                    <div className="morris-hover-row-label text-center">{label}</div>
                    {payload.map((item) => (
                        <div key={item.name} className="morris-hover-point" style={{ color: item.fill }}>
                            {`${item.name.charAt(0).toUpperCase() + item.name.slice(1).replace('_', ' ')}: ${item.value}`}
                        </div>
                    ))}
                </div>
            );
        }

        return null;
    }

    return (
        <div>
            <h4 className="header-title m-t-0 m-b-0">Users Plan Statistics</h4>
            <p>Current Year</p>
            <div className="text-center">
                <ul className="list-inline chart-detail-list">
                    {keys.map((key, index) => (
                        <li className="list-inline-item text-center" key={key}>
                            <h5 style={{ color: `hsl(${index * 50}, 90%, 50%)` }}>
                                <i className="fa fa-circle m-r-5"></i>{key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                            </h5>
                        </li>
                    ))}
                </ul>
            </div>

            <div id="morris-bar-example" style={{ height: '300px', position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        {keys.map((key, index) => (
                            <Bar
                                key={key}
                                dataKey={key}
                                fill={`hsl(${index * 50}, 90%, 50%)`}
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
