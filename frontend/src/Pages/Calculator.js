import React, { useState } from 'react';
import './../CSS/Calculator.css'



const TableData = [
  { hv: 746, hb: 601, hrb: '', hrc: 58, mpa: '' },
  { hv: 727, hb: 592, hrb: '', hrc: 57, mpa: '' },
  { hv: 694, hb: 572, hrb: '', hrc: 56, mpa: '' },
  { hv: 649, hb: 552, hrb: '', hrc: 55, mpa: '' },
  { hv: 589, hb: 534, hrb: 120, hrc: 54, mpa: '' },
  { hv: 567, hb: 513, hrb: 119, hrc: 53, mpa: '' },
  { hv: 549, hb: 504, hrb: 118, hrc: 52, mpa: '' },
  { hv: 531, hb: 486, hrb: 118, hrc: 51, mpa: '' },
  { hv: 505, hb: 469, hrb: 117, hrc: 50, mpa: '' },
  { hv: 497, hb: 468, hrb: 117, hrc: 49, mpa: '' },
  { hv: 490, hb: 456, hrb: 116, hrc: 48, mpa: 1569 },
  { hv: 474, hb: 445, hrb: 115, hrc: 47, mpa: 1520 },
  { hv: 458, hb: 430, hrb: 115, hrc: 46, mpa: 1471 },
  { hv: 448, hb: 419, hrb: 114, hrc: 45, mpa: 1447 },
  { hv: 438, hb: 415, hrb: 114, hrc: 44, mpa: 1422 },
  { hv: 424, hb: 402, hrb: 114, hrc: 43, mpa: 1390 },
  { hv: 406, hb: 388, hrb: 113, hrc: 42, mpa: 1363 },
  { hv: 393, hb: 375, hrb: 112, hrc: 41, mpa: 1314 },
  { hv: 388, hb: 373, hrb: 111, hrc: 40, mpa: 1265 },
  { hv: 376, hb: 360, hrb: 111, hrc: 39, mpa: 1236 },
  { hv: 361, hb: 348, hrb: 110, hrc: 38, mpa: 1187 },
  { hv: 351, hb: 341, hrb: 109, hrc: 37, mpa: 1157 },
  { hv: 342, hb: 331, hrb: 109, hrc: 36, mpa: 1118 },
  { hv: 332, hb: 322, hrb: 108, hrc: 35, mpa: 1089 },
  { hv: 320, hb: 314, hrb: 108, hrc: 34, mpa: 1049 },
  { hv: 311, hb: 308, hrb: 107, hrc: 33, mpa: 1035 },
  { hv: 303, hb: 300, hrb: 107, hrc: 32, mpa: 1020 },
  { hv: 292, hb: 290, hrb: 106, hrc: 31, mpa: 990 },
  { hv: 285, hb: 277, hrb: 105, hrc: 30, mpa: 971 },
  { hv: 277, hb: 271, hrb: 104, hrc: 29, mpa: 941 },
  { hv: 271, hb: 264, hrb: 103, hrc: 28, mpa: 892 },
  { hv: 262, hb: 262, hrb: 103, hrc: 27, mpa: 880 },
  { hv: 258, hb: 255, hrb: 102, hrc: 26, mpa: 870 },
  { hv: 255, hb: 250, hrb: 101, hrc: 25, mpa: 853 },
  { hv: 252, hb: 245, hrb: 100, hrc: 24, mpa: 838 },
  { hv: 247, hb: 240, hrb: 100, hrc: 23, mpa: 824 },
  { hv: 241, hb: 233, hrb: 99, hrc: 22, mpa: 794 },
  { hv: 235, hb: 229, hrb: 98, hrc: 21, mpa: 775 },
  { hv: 227, hb: 223, hrb: 97, hrc: 20, mpa: 755 },
  { hv: 222, hb: 216, hrb: 96, hrc: 19, mpa: 716 },
  { hv: 218, hb: 212, hrb: 95, hrc: 18, mpa: 706 },
  { hv: 210, hb: 208, hrb: 95, hrc: 17, mpa: 696 },
  { hv: 201, hb: 203, hrb: 94, hrc: 16, mpa: 680 },
  { hv: 199, hb: 199, hrb: 93, hrc: 15, mpa: 667 },
  { hv: 197, hb: 191, hrb: 92, hrc: 14, mpa: 657 },
  { hv: 186, hb: 190, hrb: 92, hrc: 13, mpa: 648 },
  { hv: 184, hb: 186, hrb: 91, hrc: 12, mpa: 637 },
  { hv: 183, hb: 183, hrb: 90, hrc: 11, mpa: 617 },
  { hv: 180, hb: 180, hrb: 89, hrc: 10, mpa: 608 },
  { hv: 178, hb: 175, hrb: 88, hrc: 9, mpa: 685 },
  { hv: 175, hb: 170, hrb: 87, hrc: 7, mpa: 559 },
  { hv: 172, hb: 167, hrb: 86, hrc: 6, mpa: 555 },
  { hv: 168, hb: 166, hrb: 86, hrc: 5, mpa: 549 },
  { hv: 162, hb: 163, hrb: 85, hrc: 4, mpa: 539 },
  { hv: 160, hb: 160, hrb: 84, hrc: 3, mpa: 535 },
  { hv: 158, hb: 156, hrb: 83, hrc: 2, mpa: 530 },
  { hv: 152, hb: 154, hrb: 82, hrc: 1, mpa: 515 },
  { hv: 149, hb: 149, hrb: 81, hrc: '', mpa: 500 },
  { hv: 147, hb: 147, hrb: 80, hrc: '', mpa: 490 },
  { hv: 146, hb: 143, hrb: 79, hrc: '', mpa: 482 },
  { hv: 144, hb: 141, hrb: 78, hrc: '', mpa: 481 },
  { hv: 142, hb: 139, hrb: 77, hrc: '', mpa: 480 },
  { hv: 140, hb: 137, hrb: 76, hrc: '', mpa: 475 },
  { hv: 137, hb: 135, hrb: 75, hrc: '', mpa: 467 },
  { hv: 134, hb: 131, hrb: 74, hrc: '', mpa: 461 },
  { hv: 129, hb: 127, hrb: 72, hrc: '', mpa: 451 },
  { hv: 127, hb: 121, hrb: 70, hrc: '', mpa: 431 },
  { hv: 124, hb: 116, hrb: 68, hrc: '', mpa: 422 },
  { hv: 121, hb: 114, hrb: 67, hrc: '', mpa: 412 },
  { hv: 118, hb: 111, hrb: 66, hrc: '', mpa: 402 },
  { hv: 115, hb: 107, hrb: 64, hrc: '', mpa: 382 },
  { hv: 112, hb: 105, hrb: 62, hrc: '', mpa: 378 },
  { hv: 108, hb: 103, hrb: 61, hrc: '', mpa: 373 },
  { hv: 104, hb: 95, hrb: 56, hrc: '', mpa: '' },
  { hv: 95, hb: 90, hrb: 52, hrc: '', mpa: '' },
  { hv: 85, hb: 81, hrb: 41, hrc: '', mpa: '' },
  { hv: 80, hb: 76, hrb: 37, hrc: '', mpa: '' },
  { hv: 800, hb: '', hrb: '', hrc: 72, mpa: '' },
  { hv: 780, hb: '', hrb: '', hrc: 71, mpa: '' },
  { hv: 760, hb: '', hrb: '', hrc: 70, mpa: '' },
  { hv: 752, hb: '', hrb: '', hrc: 69, mpa: '' },
  { hv: 745, hb: '', hrb: '', hrc: 68, mpa: '' },
  { hv: 746, hb: '', hrb: '', hrc: 67, mpa: '' },
  { hv: 735, hb: '', hrb: '', hrc: 66, mpa: '' },
  { hv: 711, hb: '', hrb: '', hrc: 65, mpa: '' },
  { hv: 695, hb: '', hrb: '', hrc: 64, mpa: '' },
  { hv: 681, hb: '', hrb: '', hrc: 63, mpa: '' },
  { hv: 658, hb: '', hrb: '', hrc: 62, mpa: '' },
  { hv: 642, hb: '', hrb: '', hrc: 61, mpa: '' },
  { hv: 627, hb: '', hrb: '', hrc: 60, mpa: '' },
  { hv: 613, hb: '', hrb: '', hrc: 59, mpa: '' },
];

const HardnessConversion = () => {
  const [values, setValues] = useState({
    hv: '',
    hb: '',
    hrb: '',
    hrc: '',
    mpa: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const findClosestSmallerValue = (arr, fieldName, enteredValue) => {
    const validEntries = arr
      .filter(data => data[fieldName] !== '')
      .map(data => data[fieldName]);
    const closestValue = validEntries.reduce((prev, curr) => {
      return curr <= enteredValue && curr > prev ? curr : prev;
    }, -Infinity);
    return closestValue === -Infinity ? null : closestValue;
  };

  const calculateHardness = (fieldName) => {
    const enteredValue = parseFloat(values[fieldName]);
    if (isNaN(enteredValue)) return; // No valid number entered

    let hardnessData;
    const closestValue = findClosestSmallerValue(TableData, fieldName, enteredValue);

    if (closestValue !== null) {
      hardnessData = TableData.find(data => data[fieldName] === closestValue);
    }

    if (hardnessData) {
      setValues({
        hv: hardnessData.hv.toString(),
        hb: hardnessData.hb.toString(),
        hrb: hardnessData.hrb.toString(),
        hrc: hardnessData.hrc.toString(),
        mpa: hardnessData.mpa.toString(),
      });
    } else {
      setValues({
        ...values,
        [fieldName]: '',
      });
    }
  };

  return (
    <form id="conversiondurete" name="conversiondurete" action="#">
      <h2 className='calc_head'>Hardness calculator</h2>
      <div>
        Hardness HV
        <div className="input-group">
          <input className="input-group-field" placeholder="-" name="hv" type="text" id="hv" size="5" maxLength="5" onBlur={() => calculateHardness('hv')} onChange={handleChange} value={values.hv} />
        </div>
      </div>
      <div>
        Hardness HB
        <div className="input-group">
          <input className="input-group-field" placeholder="-" name="hb" type="text" id="hb" size="5" maxLength="5" onBlur={() => calculateHardness('hb')} onChange={handleChange} value={values.hb} />
        </div>
      </div>
      <div>
        Hardness HRB
        <div className="input-group">
          <input className="input-group-field" placeholder="-" name="hrb" type="text" id="hrb" size="5" maxLength="5" onBlur={() => calculateHardness('hrb')} onChange={handleChange} value={values.hrb} />
        </div>
      </div>
      <div>
        HRC hardness
        <div className="input-group">
          <input className="input-group-field" placeholder="-" name="hrc" type="text" id="hrc" size="5" maxLength="5" onBlur={() => calculateHardness('hrc')} onChange={handleChange} value={values.hrc} />
        </div>
      </div>
      <div>
        MPA
        <div className="input-group">
          <input className="input-group-field" placeholder="-" name="mpa" type="text" id="mpa" size="5" maxLength="5" onBlur={() => calculateHardness('mpa')} onChange={handleChange} value={values.mpa} />
        </div>
      </div>
      <p className="action-bouton">
        <input type="button" className="submit button blue" id="calcul" value="Calculate" />
        <input type="reset" className="reset button green" onClick={() => setValues({ hv: '', hb: '', hrb: '', hrc: '', mpa: '' })} value="Reset" />
      </p>
    </form>
  );
};

export default HardnessConversion;
