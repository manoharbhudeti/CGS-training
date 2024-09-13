document.getElementById('ageCalculatorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const birthdate = new Date(document.getElementById('birthdate').value);
    const today = new Date();
    
    let years = today.getFullYear() - birthdate.getFullYear();
    let months = today.getMonth() - birthdate.getMonth();
    let days = today.getDate() - birthdate.getDate();

    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }
    
    if (birthdate > today) {
        console.log("orey mowaaa!!!");
        const resultElement = document.getElementById('result');
        resultElement.textContent = "Mowa, your are from future!!";
        return; 
    }
    
    const resultElement = document.getElementById('result');
    resultElement.textContent = `Your age is ${years} years, ${months} months, and ${days} days.`;
});

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
}

window.onload = function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
};
