const SessionApiUtil = {
	login(user, success, error) {
		$.ajax({
			url: '/api/session',
			type: 'POST',
			data: { user },
			success: success,
			error(xhr) {
				const errors = xhr.responseJSON;
				error("login", errors);
			}
		});
	},

	logout(success) {
		$.ajax({
			url: '/api/session',
			method: 'DELETE',
			success: success,
			error: function () {
			  console.log("Logout error in SessionApiUtil#logout");
			}
		});
	},

	signup(user, success, error) {
		$.ajax({
			url: '/api/user',
			type: 'POST',
			dataType: 'json',
			data: { user },
			success: success,
			error(xhr) {
				const errors = xhr.responseJSON;
				error("signup", errors);
			}
		});
	},

	fetchCurrentUser(success, complete) {
		$.ajax({
			url: '/api/session',
			method: 'GET',
			success: success,
			error: function (xhr) {
			  console.log("Error in SessionApiUtil#fetchCurrentUser");
			},
      complete: function(){
				complete();
			}
		});
	}
};

module.exports = SessionApiUtil;
