<template>
    <header>
        <div class="logo"><a href="/"></a></div>
        <!--
        <form>
            <div class="formItemsGroup floatLeft">
                <input class="tBox tBoxSize02" type="text" placeholder="Order No" />
                <button class="btn btnSize02 tertiaryBtn" type="submit">
                    Search
                </button>
            </div>
        </form>
        -->
        <div class="user">
            <ul>
                <li>
                    <a href="javascript:;">
                        <span>
                            <i class="fa fa-user"></i>
                            <b>{{ userInfo.name }} {{userInfo.surname}}</b>
                        </span>                        
                    </a>
                </li>

                <li class="big-icon" title="App Info" style="padding: 0px;">
                    <router-link style="padding: 0 10px;" to="/info">
                        <i class="fa fa-info"></i>
                    </router-link>
                </li>

                <li class="big-icon" title="Logout" style="padding: 0px 5px;">
                    <a href="/logout">
                        <!-- <span class="clickable"> -->
                            <i class="fa fa-sign-out" aria-hidden="true"></i>
                        <!-- </span>                 -->
                    </a>    
                </li>
            </ul>
        </div>
    </header>
</template>
<script>
    export default {
        data: function () {
            return {
                userInfo: userInfo,
            }
        },
    }
</script>