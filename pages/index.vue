<template>
		<div class="container">
			<div class="row main">
				<div class="panel-heading">
	               <div class="panel-title text-center">
	               		<h1 class="title">Austrakr AMR <span class="badge">Demo</span>
                     </h1>
	               		<hr />
	               	</div>
	            </div> 
				<div class="main-login main-center" v-if="!login">
					<form class="form-horizontal" method="post" action="#">

						<div class="form-group">
							<label for="username" class="cols-sm-2 control-label" >Username</label>
							<div class="cols-sm-10">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
									<input type="text" v-model="username" class="form-control" name="username" id="username"  placeholder="Enter your Username"/>
								</div>
							</div>
						</div>

						<div class="form-group">
							<label for="password" class="cols-sm-2 control-label">Password</label>
							<div class="cols-sm-10">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="password" v-model="password" class="form-control" name="password" id="password"  placeholder="Enter your Password"/>
								</div>
							</div>
						</div>

						<div class="form-group ">
							<button @click="loginDemo()" type="button" class="btn btn-primary btn-lg btn-block login-button">Login</button>
						</div>
					</form>
				</div>
			</div>
		</div>
</template>

<script>
export default {
  data() {
    return {
      login: false,
      username: "",
      password: ""
    };
  },
  methods: {
    loginDemo() {
      if (this.username == "demo" && this.password == "demo") {
        this.login = true;
        if (this.login) {
          this.$store.commit("toggle");
          this.$router.push("samples");
        }
      } else {
        alert("Please use username: demo and password: demo to enter");
      }
    }
  }
};
</script>

<style scoped>
.main {
  margin-top: 70px;
}

h1.title {
  font-size: 50px;
  font-family: "sans-serif";
  font-weight: 400;
}

hr {
  width: 10%;
  color: #fff;
}

.form-group {
  margin-bottom: 15px;
}

label {
  margin-bottom: 15px;
}

input,
input::-webkit-input-placeholder {
  font-size: 11px;
  padding-top: 3px;
}

.main-login {
  background-color: #fff;
  /* shadows and rounded borders */
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.main-center {
  margin-top: 30px;
  margin: 0 auto;
  max-width: 330px;
  padding: 40px 40px;
}

.login-button {
  margin-top: 5px;
}

.login-register {
  font-size: 11px;
  text-align: center;
}

.badge {
  font-size: 20px;
}
</style>
