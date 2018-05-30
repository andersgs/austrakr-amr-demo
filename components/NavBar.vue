<template>
    <div>
        <nav class="clearfix">
            <ul class="clearfix">
                <li><nuxt-link to="/">Home</nuxt-link></li>
                <li v-if="login"><nuxt-link to="/samples">Search</nuxt-link></li>
                <li v-if="login"><nuxt-link to="/analysis">Analysis</nuxt-link></li>
                <li class="nav navbar-right" v-if="login"><button @click.capture="logOut()">Logout</button></li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
  props: ["login"],
  data() {
    return {
      // login: false
    };
  },
  methods: {
    logOut() {
      this.$store.commit("toggle");
      this.$router.push("/");
    }
  }
};
</script>


<style scoped>
/* Clearfix */
.clearfix:before,
.clearfix:after {
  content: " ";
  display: table;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  *zoom: 1;
}
nav {
  height: 40px;
  width: 100%;
  background: #455868;
  font-size: 11pt;
  font-family: "PT Sans", Arial, sans-serif;
  font-weight: bold;
  position: relative;
  border-bottom: 2px solid #283744;
}
nav ul {
  padding: 0;
  margin: 0 auto;
  width: 600px;
  height: 40px;
}
nav li {
  display: inline;
  /* float: left; */
}
nav a {
  color: #fff;
  display: inline-block;
  width: 100px;
  text-align: center;
  text-decoration: none;
  line-height: 40px;
  text-shadow: 1px 1px 0px #283744;
}

nav button {
  color: #fff;
  display: inline-block;
  width: 100px;
  height: 40px;
  text-align: center;
  text-decoration: none;
  line-height: 40px;
  text-shadow: 1px 1px 0px #283744;
  background: #455868;
  border-style: none;
}

nav li a {
  border-right: 1px solid #576979;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
nav li:last-child a {
  border-right: 0;
}
nav a:hover,
nav a:active {
  background-color: #8c99a4;
}
nav a#pull {
  display: none;
}
</style>
