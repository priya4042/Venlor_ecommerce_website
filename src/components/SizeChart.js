// src/components/SizeChart.jsx

import React, { useState } from 'react';
import './SizeChart.css';

const SizeChart = () => {
  const [showChart, setShowChart] = useState(false);

  return (
    <div className="size-chart-container">
      <button className="toggle-chart" onClick={() => setShowChart(!showChart)}>
        {showChart ? 'Hide Size Chart' : 'Show Size Chart'}
      </button>

      {showChart && (
        <div className="size-chart-table">
          <table>
            <thead>
              <tr>
                <th>Size</th>
                <th>Chest (in)</th>
                <th>Length (in)</th>
                <th>Shoulder (in)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>S</td>
                <td>38</td>
                <td>26</td>
                <td>17</td>
              </tr>
              <tr>
                <td>M</td>
                <td>40</td>
                <td>27</td>
                <td>18</td>
              </tr>
              <tr>
                <td>L</td>
                <td>42</td>
                <td>28</td>
                <td>18.5</td>
              </tr>
              <tr>
                <td>XL</td>
                <td>44</td>
                <td>29</td>
                <td>19</td>
              </tr>
              <tr>
                <td>XXL</td>
                <td>46</td>
                <td>30</td>
                <td>20</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SizeChart;
