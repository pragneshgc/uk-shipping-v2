<template>
    <div class="content">
        <section class="card">
            <div class="card-header">
                <h3>User details</h3>
            </div>
            <!-- Grid Row -->
            <div class="card-body">
                <form class="text-center p-5" v-on:submit.prevent="update">

                    <p class="h4 mb-3">User details</p>

                    <!-- Name -->
                    <input v-model="data.name" type="text" id="name" class="form-control tBoxSize02 mb-10" placeholder="Name">
                    <div v-if="errors.name" class="invalid-feedback d-block">{{ errors.name[0] }}</div>
                    
                    <!-- Surname -->
                    <input v-model="data.surname" type="text" id="surname" class="form-control tBoxSize02 mb-10" placeholder="Surname">
                    <div v-if="errors.surname" class="invalid-feedback d-block">{{ errors.surname[0] }}</div>
                    <br>
                    <!-- Role -->
                    <label>Role</label>
                    <select v-model="data.role" class="browser-default custom-select mb-10">
                        <option value="5">Shipping</option>
                        <option value="10">PXP</option>
                        <option value="20">Dispenser</option>
                        <option value="30">Pharmacist</option>
                        <option value="40">Customer Service</option>
                        <option value="50">Admin</option>
                        <option value="60">Sysadmin</option>
                    </select>

                    <div v-if="errors.role" class="invalid-feedback d-block">{{ errors.role[0] }}</div>
                    <br>
                    <label v-if="userInfo.role >= 50">ESA User</label>
                    <select v-if="userInfo.role >= 50" v-model="data.esa_user_id" class="browser-default custom-select mb-10">
                        <option v-for="user in esaUsers" :value="user.UserID">{{ user.Username }}</option>
                    </select>    

                    <div v-if="errors.esa_user_id" class="invalid-feedback d-block">{{ errors.esa_user_id[0] }}</div>

                    <br>

                    <transition name="fade">
                        <!-- Password -->
                        <input autocomplete="off" v-if="passwordFieldVisible" v-model="password" type="password" name="new-password" id="password" class="form-control tBoxSize02 mb-3" placeholder="Password">
                        <div v-if="errors.password" class="invalid-feedback d-block">{{ errors.password[0] }}</div>
                    </transition>

                    <transition name="fade">
                        <div>
                            <div class="input-group mb-3" v-if="loginCodeVisible">
                                <input style="margin: 0!important;" autocomplete="off" v-model="data.code" type="code" name="code" id="code" class="form-control tBoxSize02 mb-10" placeholder="Login Code">
                                <div class="input-group-append" style="display: inline;">
                                    <button @click="storeCode()" class="btn btnSize01 secondaryBtn m-0 z-depth-0 waves-effect" type="button" id="button-addon2">Generate Code</button>
                                </div>
                            </div>

                            <div v-if="errors.code" class="invalid-feedback d-block">{{ errors.code[0] }}</div>
                        </div>
                    </transition>

                    <br>

                    <transition name="fade">
                        <!-- Email -->
                        <input v-if="emailFieldVisible" v-model="data.email" type="email" id="email" class="form-control tBoxSize02 mb-10" placeholder="E-mail">
                        <div v-if="errors.email" class="invalid-feedback d-block">{{ errors.email[0] }}</div>
                    </transition>
                    <br>

                    <div class="row filters-row">
                        <div>
                            <input name="authorize" type="checkbox" :checked="authorizable">
                            <label class="clickable" for="authorize" @click="toggleAuthorizability()">User can authorize with code</label>
                        </div>          
                    </div>

                    <div>
                        <button @click="togglePasswordChange" class="btn btnSize01 secondaryBtn" type="button">Change password</button>
                        <button @click="toggleEmailChange" class="btn btnSize01 secondaryBtn" type="button">Change email</button>
                        <button @click="toggleLoginCodeChange" class="btn btnSize01 secondaryBtn" type="button">Change login code</button>
                        <button v-if="userInfo.role == 60" @click="loginAs" class="btn btnSize01 secondaryBtn" type="button">Login as user</button>
                        <!-- Send button -->
                        <button class="btn btnSize01 secondaryBtn" type="submit">Update</button>
                    </div>

                </form>
            </div>
            <!--Grid row-->                    
        </section>
    </div>
</template>

<script>
    import Error from '../../../mixins/errors'

    export default {
        mixins: [ Error ],
        data: function () {
            return {
                data: {},
                esaUsers: {},
                password: null,
                authorizable: false,
                passwordFieldVisible: false,
                emailFieldVisible: false,
                loginCodeVisible: false,
                loading: false,
                errors: {},
                userInfo: userInfo,
            }
        },
        mounted() {
            if(userInfo.id != this.$route.params.id && userInfo.role < 50){
                this.$router.push('/notallowed');
            } else {
                this.getData();
                this.checkAuthorizability();
            }
        },
        computed: {
            tableUrl: function(){
                return '/inventory/user/'+this.$route.params.id;
            },
            dataUrl: function(){
                return '/users/'+this.$route.params.id;
            },
            postUrl: function(){
                return '/users/'+this.$route.params.id;
            },
            loginAsUrl: function(){
                return '/login_as/'+this.$route.params.id;
            }
        },
        methods: {
            getData: function(){
                this.loading = true;

                axios.get(this.dataUrl)
                .then((response) => {
                    this.data = response.data.data.userData;
                    this.esaUsers = response.data.data.esaUsers;
                    this.loading = false;
                })
                .catch((error) => {
                    this.reportError(error);
                })
            },
            checkAuthorizability(){
                axios.get(`/users/${this.$route.params.id}/authorizable`)
                .then((response) => {
                    this.authorizable = response.data.data;
                })
                .catch((error) => {
                    this.reportError(error);
                })
            },
            toggleAuthorizability(){
                axios.post(`/users/${this.$route.params.id}/authorizable`, {authorizable: !this.authorizable})
                .then((response) => {
                    this.postSuccess(response.data.message);
                    this.checkAuthorizability();
                })
                .catch((error) => {
                    this.reportError(error);
                })                
            },
            togglePasswordChange: function(){
                this.passwordFieldVisible = !this.passwordFieldVisible;
            },
            toggleEmailChange: function(){
                this.emailFieldVisible = !this.emailFieldVisible;
            },
            toggleLoginCodeChange: function(){
                this.loginCodeVisible = !this.loginCodeVisible;
            },
            update: function(){
                this.loading = true;

                let postData = {
                    name: this.data.name,
                    surname: this.data.surname,
                    email: this.data.email,
                    role: this.data.role,
                    code: this.data.code,
                    esa_user_id: this.data.esa_user_id
                }

                if(this.password){
                    postData.password = this.password;
                }

                axios.post(this.postUrl, postData)
                .then((response) => {
                    this.postSuccess(response.data.message);
                    this.errors = {};
                    this.loading = false;
                })
                .catch((error) => {
                    // this.postError(error.response.data.errors);
                    this.errors = error.response.data.errors;
                    this.loading = false;
                });           
            },
            loginAs: function(){
                axios.get(this.loginAsUrl)
                .then((response) => {
                    location.reload();
                })
                .catch((error) => {
                    console.warn(error);
                })
            },
            generateCode(length) {
                var result           = '';
                var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$%()[]?!:@/';
                var charactersLength = characters.length;
                for ( var i = 0; i < length; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            },
            storeCode(){
                this.data.code = this.generateCode(14);
            }
        }
    }
</script>
