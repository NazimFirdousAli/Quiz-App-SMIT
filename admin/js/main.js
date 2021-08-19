$(function () {
	'use strict';


	$('.form-control').on('input', function () {
		var $field = $(this).closest('.form-group');
		if (this.value) {
			$field.addClass('field--not-empty');
		} else {
			$field.removeClass('field--not-empty');
		}
	});

});






const loginAdmin = (e) => {
	const adminEmail = document.getElementById('username').value;
	const adminPassword = document.getElementById('password').value;
	event.preventDefault(e);
	if (adminEmail == 'admin@gmail.com') {
		firebase.auth().signInWithEmailAndPassword(adminEmail, adminPassword)
			.then((userCredential) => {
				var user = userCredential.user;
				localStorage.setItem("adminEmail", user.bc.email);
				window.location.href = "dashboard/dashboard.html";
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				alert(errorMessage);
			});
	}
	else {
		firebase.auth().signInWithEmailAndPassword(adminEmail, adminPassword)
			.then((userCredential) => {
				var user = userCredential.user;
				localStorage.setItem("userEmail", user.bc.email);
				window.location.href = "../user/index.html";
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				alert(errorMessage);
			});
	}
}

const logoutAdmin = () => {
	firebase.auth().signOut().then(() => {
		window.location.href = "../index.html";
	}).catch((error) => {
		// An error happened.
	});

}

const loadMore = (e) => {
	event.preventDefault(e);
	document.getElementById("questionsId").innerHTML = `
	<div class="row">
		<div class="col-md-12">
			<div class="form-group">
				<label>Question</label>
				<input type="text" class="form-control" placeholder="Home Address">
			</div>
		</div>
	</div>

	<div class="row">
		<div class="col-md-4">
			<div class="form-group">
				<label>Option 1</label>
				<input type="text" class="form-control" placeholder="Option 1">
			</div>
			<div class="form-group">
				<label>Option 2</label>
				<input type="text" class="form-control" placeholder="Option 2">
			</div>
			<div class="form-group">
				<label>Option 3</label>
				<input type="text" class="form-control" placeholder="Option 3">
			</div>
			<div class="form-group">
				<label>Option 4</label>
				<input type="text" class="form-control" placeholder="Option 4">
			</div>
			<div class="form-group">
				<label>Answer</label>
				<input type="text" class="form-control" placeholder="Answer">
			</div>
		</div>
	</div>`
}


const AddQuestions = (e) => {
	const category = document.getElementById("category").value;
	const question = document.getElementById("question").value;
	const answer = document.getElementById("answer").value;
	const option1 = document.getElementById("option1").value;
	const option2 = document.getElementById("option2").value;
	const option3 = document.getElementById("option3").value;
	const option4 = document.getElementById("option4").value;
	// console.log(category, question, answer, option1, option2, option3, option4);
	const quizQuestions = {
		question,
		option1,
		option2,
		option3,
		option4,
		answer
	}
	const jsonStringify = JSON.stringify(quizQuestions);
	console.log(jsonStringify);
	event.preventDefault(e);
	console.log(firebase.database().ref("QUIZ").child(`${category}`).push(quizQuestions))

}