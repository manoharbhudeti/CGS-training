function convertTemperature() {
    let tempValue = parseFloat(document.getElementById('tempInput').value);
    let tempScale = document.getElementById('tempScale').value;
    let resultText = '';
       if (tempScale === 'celsius') {
            let fahrenheit = (tempValue * 9/5) + 32;
            let kelvin = tempValue + 273.15;
            resultText = `${tempValue}°C = ${fahrenheit.toFixed(2)}°F, ${kelvin.toFixed(2)}K`;
        } else if (tempScale === 'fahrenheit') {
            let celsius = (tempValue - 32) * 5/9;
            let kelvin = (tempValue + 459.67) * 5/9;
            resultText = `${tempValue}°F = ${celsius.toFixed(2)}°C, ${kelvin.toFixed(2)}K`;
        } else if (tempScale === 'kelvin') {
            let celsius = tempValue - 273.15;
            let fahrenheit = (tempValue * 9/5) - 459.67;
            resultText = `${tempValue}K = ${celsius.toFixed(2)}°C, ${fahrenheit.toFixed(2)}°F`;
        }

    // document.getElementById('result').textContent = resultText;
    let res = document.getElementById('result').innerText= resultText;
}
