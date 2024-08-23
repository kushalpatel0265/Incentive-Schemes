function updateForm() {
    const scheme = document.getElementById('schemeSelect').value;
    const inputFields = document.getElementById('inputFields');
    inputFields.innerHTML = ''; // Clear previous inputs

    switch (scheme) {
        case 'halsey':
        case 'halseyWeir':
        case 'rowan':
            inputFields.innerHTML = `
                <div>
                    <label for="standardTime">Standard Time (hours):</label>
                    <input type="number" id="standardTime" name="standardTime" required>
                </div>

                <div>
                    <label for="actualTime">Actual Time (hours):</label>
                    <input type="number" id="actualTime" name="actualTime" required>
                </div>

                <div>
                    <label for="timeRate">Time Rate (per hour):</label>
                    <input type="number" id="timeRate" name="timeRate" required>
                </div>
            `;
            break;

        case 'taylor':
            inputFields.innerHTML = `
                <div>
                    <label for="standardProduction">Standard Production (units/hour):</label>
                    <input type="number" id="standardProduction" name="standardProduction" required>
                </div>

                <div>
                    <label for="workingHours">Working Hours:</label>
                    <input type="number" id="workingHours" name="workingHours" required>
                </div>

                <div>
                    <label for="standardWage">Standard Wage (per unit):</label>
                    <input type="number" id="standardWage" name="standardWage" required>
                </div>

                <div>
                    <label for="actualProduction">Actual Production Rate (units/hour):</label>
                    <input type="number" id="actualProduction" name="actualProduction" required>
                </div>
            `;
            break;

        case 'merrick':
        case 'gantt':
        case 'emerson':
            inputFields.innerHTML = `
                <div>
                    <label for="standardProduction">Standard Production (units/hour):</label>
                    <input type="number" id="standardProduction" name="standardProduction" required>
                </div>

                <div>
                    <label for="pieceRate">Piece Rate (per unit):</label>
                    <input type="number" id="pieceRate" name="pieceRate" required>
                </div>

                <div>
                    <label for="workingHours">Working Hours:</label>
                    <input type="number" id="workingHours" name="workingHours" required>
                </div>

                <div>
                    <label for="totalUnits">Actual Production (units/hour):</label>
                    <input type="number" id="totalUnits" name="totalUnits" required>
                </div>
            `;
            break;

        default:
            inputFields.innerHTML = '';
            break;
    }
}

function calculateBonus() {
    const scheme = document.getElementById('schemeSelect').value;
    let result;

    switch (scheme) {
        case 'halsey':
            const standardTimeHalsey = parseFloat(document.getElementById('standardTime').value);
            const actualTimeHalsey = parseFloat(document.getElementById('actualTime').value);
            const timeRateHalsey = parseFloat(document.getElementById('timeRate').value);

            const timeSavedHalsey = standardTimeHalsey - actualTimeHalsey;
            const bonusHalsey = timeSavedHalsey * timeRateHalsey * 0.5; // 50% of time saved as bonus
            if(bonusHalsey <= 0)
            {
                result = (actualTimeHalsey * timeRateHalsey);
            }
            else
            {
                result = (actualTimeHalsey * timeRateHalsey) + bonusHalsey;
            }
            document.getElementById('result').innerText = `Total Earnings: $${result.toFixed(2)}`;
            break;

        case 'halseyWeir':
            const standardTimeWeir = parseFloat(document.getElementById('standardTime').value);
            const actualTimeWeir = parseFloat(document.getElementById('actualTime').value);
            const timeRateWeir = parseFloat(document.getElementById('timeRate').value);

            const timeSavedWeir = standardTimeWeir - actualTimeWeir;
            const bonusWeir = timeSavedWeir * timeRateWeir * 0.3; // 30% of time saved as bonus
            if(bonusWeir <= 0)
            {
                result = (actualTimeWeir * timeRateWeir);
            }
            else
            {
                result = (actualTimeWeir * timeRateWeir) + bonusWeir;
            }
            document.getElementById('result').innerText = `Total Earnings: $${result.toFixed(2)}`;
            break;

        case 'rowan':
            const standardTimeRowan = parseFloat(document.getElementById('standardTime').value);
            const actualTimeRowan = parseFloat(document.getElementById('actualTime').value);
            const timeRateRowan = parseFloat(document.getElementById('timeRate').value);

            const timeSavedRowan = standardTimeRowan - actualTimeRowan;
            const bonusRowan = (timeSavedRowan / standardTimeRowan) * (actualTimeRowan * timeRateRowan);
            if(bonusRowan <= 0)
            {
                result = (actualTimeRowan * timeRateRowan);
            }
            else
            {
                result = (actualTimeRowan * timeRateRowan) + bonusRowan;
            }
            document.getElementById('result').innerText = `Total Earnings: $${result.toFixed(2)}`;
            break;

        case 'taylor':
            const standardProductionTaylor = parseFloat(document.getElementById('standardProduction').value);
            const workingHoursTaylor = parseFloat(document.getElementById('workingHours').value);
            const standardWageTaylor = parseFloat(document.getElementById('standardWage').value);
            const actualProductionTaylor = parseFloat(document.getElementById('actualProduction').value);
            
            const actualProduction = actualProductionTaylor * workingHoursTaylor;
            const standardProduction = standardProductionTaylor * workingHoursTaylor;
            const higherPieceRateTaylor = standardWageTaylor * 1.2;
            const lowerPieceRateTaylor = standardWageTaylor * 0.8;

            if (actualProduction >= standardProduction) 
            {
                result = actualProduction * higherPieceRateTaylor;
            }
            else 
            {
                result = actualProduction * lowerPieceRateTaylor;
            }
            document.getElementById('result').innerText = `Total Earnings: $${result.toFixed(2)}`;
            break;

        case 'merrick':
            const standardProductionMerrick = parseFloat(document.getElementById('standardProduction').value);
            const pieceRateMerrick = parseFloat(document.getElementById('pieceRate').value);
            const workingHoursMerrick = parseFloat(document.getElementById('workingHours').value);
            const actualProductionMerrick = parseFloat(document.getElementById('totalUnits').value);

            let pieceRate;
            const efficiencyMerrick = (actualProductionMerrick / (standardProductionMerrick)) * 100;

            if (efficiencyMerrick < 83) 
            {
                pieceRate = pieceRateMerrick; // Normal rate
            }
            else if (efficiencyMerrick < 100) 
            {
                pieceRate = pieceRateMerrick * 1.1; // 10% above normal rate
            } 
            else 
            {
                pieceRate = pieceRateMerrick * 1.2; // 20% above normal rate
            }
            result = actualProductionMerrick * workingHoursMerrick * pieceRate;
            document.getElementById('result').innerText = `Total Earnings: $${result.toFixed(2)}`;
            break;

        case 'gantt':
            const standardProductionGantt = parseFloat(document.getElementById('standardProduction').value);
            const pieceRateGantt = parseFloat(document.getElementById('pieceRate').value);
            const workingHoursGantt = parseFloat(document.getElementById('workingHours').value);
            const totalUnitsGantt = parseFloat(document.getElementById('totalUnits').value);

            if (totalUnitsGantt >= standardProductionGantt) 
            {
                result = totalUnitsGantt * pieceRateGantt * 1.2; // 20% bonus on the total output
            } 
            else 
            {
                result = totalUnitsGantt * pieceRateGantt; // Regular piece rate for output below 100%
            }
            document.getElementById('result').innerText = `Total Earnings: $${result.toFixed(2)}`;
            break;

        case 'emerson':
            const standardProductionEmerson = parseFloat(document.getElementById('standardProduction').value);
            const pieceRateEmerson = parseFloat(document.getElementById('pieceRate').value);
            const workingHoursEmerson = parseFloat(document.getElementById('workingHours').value);
            const actualProductionEmerson = parseFloat(document.getElementById('totalUnits').value);

            const efficiencyEmerson = (actualProductionEmerson / (standardProductionEmerson)) * 100;

            if (efficiencyEmerson < 66.67) 
            {
                result = actualProductionEmerson * workingHoursEmerson * pieceRateEmerson; // Only day wage
            } 
            else if (efficiencyEmerson <= 100) 
            {
                result = (actualProductionEmerson * workingHoursEmerson *  pieceRateEmerson) * 1.2; // 20% bonus at 100% efficiency
            } 
            else 
            {
                result = ((actualProductionEmerson * workingHoursEmerson * pieceRateEmerson) * (0.2 + (efficiencyEmerson - 100) * 0.01)) + (actualProductionEmerson * workingHoursEmerson *  pieceRateEmerson); // 1% bonus for each % over 100% efficiency
            }
            document.getElementById('result').innerText = `Total Earnings: $${result.toFixed(2)}`;
            break;

        default:
            document.getElementById('result').innerText = 'Please select an incentive plan.';
            break;
    }
}
