import React, { useState } from 'react';

const HardnessConverter = () => {
  // Define state variables for input and output values
  const [hvValue, setHvValue] = useState('');
  const [hbValue, setHbValue] = useState('');
  const [hrbValue, setHrbValue] = useState('');
  const [hrcValue, setHrcValue] = useState('');
  const [mpaValue, setMpaValue] = useState('');
  const [result, setResult] = useState({});

  // Define table data
  const tableData = [
    { hv: 115, hb: 109, hrb: 65, hrc: '', mpa: 390 },
    { hv: 120, hb: 114, hrb: 67, hrc: '', mpa: 410 },
    { hv: 125, hb: 119, hrb: 69, hrc: '', mpa: 420 },
    { hv: 130, hb: 124, hrb: 71, hrc: '', mpa: 440 },
    { hv: 135, hb: 128, hrb: 73, hrc: '', mpa: 450 },
    { hv: 140, hb: 133, hrb: 75, hrc: '', mpa: 470 },
    { hv: 145, hb: 138, hrb: 77, hrc: '', mpa: 480 },
    { hv: 150, hb: 143, hrb: 79, hrc: '', mpa: 500 },
    { hv: 155, hb: 147, hrb: 81, hrc: '', mpa: 510 },
    { hv: 160, hb: 152, hrb: 82, hrc: '', mpa: 530 },
    { hv: 165, hb: 157, hrb: 84, hrc: '', mpa: 540 },
    { hv: 170, hb: 162, hrb: 85, hrc: '', mpa: 550 },
    { hv: 175, hb: 166, hrb: 86, hrc: '', mpa: 570 },
    { hv: 180, hb: 171, hrb: 87, hrc: '', mpa: 580 },
    { hv: 185, hb: 176, hrb: 89, hrc: '', mpa: 600 },
    { hv: 190, hb: 181, hrb: 90, hrc: '', mpa: 610 },
    { hv: 195, hb: 185, hrb: 91, hrc: '', mpa: 630 },
    { hv: 200, hb: 190, hrb: 92, hrc: '', mpa: 650 },
    { hv: 205, hb: 195, hrb: 93, hrc: '', mpa: 660 },
    { hv: 210, hb: 200, hrb: 94, hrc: '', mpa: 680 },
    { hv: 215, hb: 204, hrb: 95, hrc: '', mpa: 690 },
    { hv: 220, hb: 209, hrb: 96, hrc: '', mpa: 710 },
    { hv: 225, hb: 214, hrb: 96, hrc: '', mpa: 720 },
    { hv: 230, hb: 219, hrb: '', hrc: '', mpa: 740 },
    { hv: 235, hb: 223, hrb: '', hrc: '', mpa: 750 },
    { hv: 240, hb: 228, hrb: '', hrc: 20, mpa: 770 },
    { hv: 245, hb: 233, hrb: '', hrc: 21, mpa: 780 },
    { hv: 250, hb: 236, hrb: '', hrc: 22, mpa: 800 },
    { hv: 255, hb: 242, hrb: '', hrc: 23, mpa: 820 },
    { hv: 260, hb: 247, hrb: '', hrc: 24, mpa: 830 },
    { hv: 265, hb: 252, hrb: '', hrc: 25, mpa: 850 },
    { hv: 270, hb: 257, hrb: '', hrc: 27, mpa: 860 },
    { hv: 275, hb: 261, hrb: '', hrc: 26, mpa: 880 },
    { hv: 280, hb: 266, hrb: '', hrc: 27, mpa: 890 },
    { hv: 285, hb: 271, hrb: '', hrc: 28, mpa: 910 },
    { hv: 290, hb: 276, hrb: '', hrc: 29, mpa: 930 },
    { hv: 295, hb: 280, hrb: '', hrc: 29, mpa: 940 },
    { hv: 300, hb: 285, hrb: '', hrc: 30, mpa: 960 },
    { hv: 310, hb: 295, hrb: '', hrc: 31, mpa: 990 },
    { hv: 320, hb: 304, hrb: '', hrc: 32, mpa: 1020 },
    { hv: 330, hb: 314, hrb: '', hrc: 33, mpa: 1060 },
    { hv: 340, hb: 323, hrb: '', hrc: 34, mpa: 1090 },
    { hv: 350, hb: 333, hrb: '', hrc: 36, mpa: 1120 },
    { hv: 360, hb: 342, hrb: '', hrc: 37, mpa: 1160 },
    { hv: 370, hb: 352, hrb: '', hrc: 38, mpa: 1190 },
    { hv: 380, hb: 361, hrb: '', hrc: 39, mpa: 1220 },
    { hv: 390, hb: 371, hrb: '', hrc: 40, mpa: 1260 },
    { hv: 400, hb: 380, hrb: '', hrc: 41, mpa: 1290 },
    { hv: 410, hb: 390, hrb: '', hrc: 42, mpa: 1330 },
    { hv: 420, hb: 399, hrb: '', hrc: 43, mpa: 1360 },
    { hv: 430, hb: 409, hrb: '', hrc: 44, mpa: 1400 },
    { hv: 440, hb: 418, hrb: '', hrc: 45, mpa: 1430 },
    { hv: 450, hb: 423, hrb: '', hrc: 45, mpa: 1470 },
    { hv: 460, hb: 432, hrb: '', hrc: 46, mpa: 1500 },
    { hv: 470, hb: 442, hrb: '', hrc: 47, mpa: 1540 },
    { hv: 480, hb: 450, hrb: '', hrc: 48, mpa: 1570 },
    { hv: 490, hb: 456, hrb: '', hrc: 48, mpa: 1610 },
    { hv: 500, hb: 466, hrb: '', hrc: 49, mpa: 1650 },
    { hv: 510, hb: 475, hrb: '', hrc: 50, mpa: 1680 },
    { hv: 520, hb: 483, hrb: '', hrc: 51, mpa: 1720 },
    { hv: 530, hb: 492, hrb: '', hrc: 51, mpa: 1760 },
    { hv: 540, hb: 500, hrb: '', hrc: 52, mpa: 1790 },
    { hv: 550, hb: 509, hrb: '', hrc: 52, mpa: 1830 },
    { hv: 560, hb: 517, hrb: '', hrc: 53, mpa: 1870 },
    { hv: 570, hb: 526, hrb: '', hrc: 54, mpa: 1910 },
    { hv: 580, hb: 535, hrb: '', hrc: 54, mpa: 1940 },
    { hv: 590, hb: 543, hrb: '', hrc: 55, mpa: 1980 },
    { hv: 600, hb: 552, hrb: '', hrc: 55, mpa: 2020 },
    { hv: 610, hb: 560, hrb: '', hrc: 56, mpa: 2060 },
    { hv: 620, hb: 569, hrb: '', hrc: 56, mpa: 2100 },
    { hv: 630, hb: 577, hrb: '', hrc: 57, mpa: 2140 },
    { hv: 640, hb: 586, hrb: '', hrc: 57, mpa: 2180 },
    { hv: 650, hb: '', hrb: '', hrc: 58, mpa: 2220 },
    { hv: 660, hb: '', hrb: '', hrc: 58, mpa: '' },
    { hv: 670, hb: '', hrb: '', hrc: 59, mpa: '' },
    { hv: 680, hb: '', hrb: '', hrc: 59, mpa: '' },
    { hv: 690, hb: '', hrb: '', hrc: 60, mpa: '' },
    { hv: 700, hb: '', hrb: '', hrc: 60, mpa: '' },
    { hv: 720, hb: '', hrb: '', hrc: 61, mpa: '' },
    { hv: 740, hb: '', hrb: '', hrc: 62, mpa: '' },
    { hv: 760, hb: '', hrb: '', hrc: 63, mpa: '' },
    { hv: 780, hb: '', hrb: '', hrc: 63, mpa: '' },
    { hv: 800, hb: '', hrb: '', hrc: 64, mpa: '' },
    { hv: 820, hb: '', hrb: '', hrc: 65, mpa: '' },
    { hv: 840, hb: '', hrb: '', hrc: 65, mpa: '' },
  ];
  
  const handleCalculate = () => {
    let closestValues = {};
    let minDiff = Number.MAX_VALUE;

    tableData.forEach(data => {
      let diff = Math.abs(hvValue - data.hv) + Math.abs(hbValue - data.hb) + Math.abs(hrbValue - data.hrb) + Math.abs(mpaValue - data.mpa);
      if (diff < minDiff) {
        minDiff = diff;
        closestValues = data;
      }
    });

    setResult(closestValues);
  };

  // Function to reset values
  const handleReset = () => {
    setHvValue('');
    setHbValue('');
    setHrbValue('');
    setHrcValue('');
    setMpaValue('');
    setResult({});
  };

  return (
    <div className="hardness-converter-container">
      <div className="calculator">
        <h1>Steel Hardness Conversion Calculator</h1>
        <div className="input-fields">
          <div>
            <label>Hardness HV:</label>
            <input
              type="number"
              value={hvValue}
              onChange={(e) => setHvValue(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label>Hardness HB:</label>
            <input
              type="number"
              value={hbValue}
              onChange={(e) => setHbValue(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label>Hardness HRB:</label>
            <input
              type="number"
              value={hrbValue}
              onChange={(e) => setHrbValue(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label>HRC Hardness:</label>
            <input
              type="number"
              value={hrcValue}
              onChange={(e) => setHrcValue(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label>MPa:</label>
            <input
              type="number"
              value={mpaValue}
              onChange={(e) => setMpaValue(parseFloat(e.target.value))}
            />
          </div>
        </div>
        <div className="buttons">
          <button onClick={handleCalculate}>Calculate</button>
          <button onClick={handleReset}>Reset</button>
        </div>
        <div className="result">
          <p>Result:</p>
          <p>Hardness HV: {result.hv}</p>
          <p>Hardness HB: {result.hb}</p>
          <p>Hardness HRB: {result.hrb}</p>
          <p>HRC Hardness: {result.hrc}</p>
          <p>MPa: {result.mpa}</p>
        </div>
      </div>
      <div className="table-container">
        <table className="hardness-table">
          <thead>
            <tr>
              <th>Hardness HV</th>
              <th>Hardness HB</th>
              <th>Hardness HRB</th>
              <th>HRC Hardness</th>
              <th>MPa</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => (
              <tr key={index}>
                <td>{data.hv}</td>
                <td>{data.hb}</td>
                <td>{data.hrb}</td>
                <td>{data.hrc}</td>
                <td>{data.mpa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
};

export default HardnessConverter;