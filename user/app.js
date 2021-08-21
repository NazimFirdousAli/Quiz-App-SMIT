var arr = [];
const category = () => {
    firebase.database().ref("QUIZ").on('child_added', async function (data) {
        await arr.push(data.key);
    });
    setTimeout(() => {
        for (let i = 0; i < arr.length; i++) {
            const a = arr[i].replaceAll(" ", "-");
            document.getElementById('abcd').innerHTML += `
            <div class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Start the quiz of ${arr[i].toUpperCase()}</h5>
                  <p class="card-text">You have limited time to attempt quiz.</p>
                  <button class="btn btn-primary" id=${a} value=${a} onclick=${'loadQuestion(value)'}>${arr[i].toUpperCase()}</button>
                  </div>
              </div>
            </div>
            `
        }
    }, 8000);
}
category();


const loadQuestion = (value) => {
    window.location.href = "./questions.html";
    localStorage.setItem("category", value.replaceAll("-", " ") );
}
