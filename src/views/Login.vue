<template>
    <div id="login">
        <div id="inputContainer">
            <p>使用者登入</p>
            <div id="inputGroup">
                <div class="inputWrapper">
                    <!-- <font-awesome-icon class="FA_Icon" icon="user" /> -->
                    <input type="text" v-model="user" placeholder="使用者名稱" autocomplete="off" />
                </div>
                <div class="inputWrapper">
                    <!-- <font-awesome-icon class="FA_Icon" icon="key" /> -->
                    <input type="password" v-model="drowssap" placeholder="密碼" autocomplete="off" />
                </div>
            </div>
            <button @click="login" type="button">登入</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from 'vue-router';

const router = useRouter();
const user = ref("");
const drowssap = ref("");

function login() {
    router.push("/index");
}
</script>

<style lang="scss" scoped>
#login {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("@/assets/image/loginBackground.png");
    background-size: cover;
    background-repeat: no-repeat;

    #inputContainer {
        width: 25em;
        height: 20em;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        background-color: rgba(var(--WHITE), 0.75);
        padding: 1em;

        p {
            font-size: 1.25em;
            font-weight: bold;
        }

        #inputGroup {
            width: 100%;
            display: flex;
            flex-direction: column;

            .inputWrapper {
                width: 100%;
                display: flex;
                align-items: center;
                // background-color: rgb(232, 240, 254);
                padding: 0 12px;

                .FA_Icon {
                    font-size: 0.75em;
                }

                input {
                    padding: 6px;
                    flex-grow: 1;
                    border-radius: 0.25em;
                    background-color: rgb(var(--WHITE));
                }

                &:first-child {
                    margin-bottom: 0.5em;
                }
            }
        }

        button {
            width: 100%;
            height: 2em;
            color: rgb(var(--WHITE));
            font-size: 1.25em;
            font-weight: bolder;
            border-radius: 0.25em;
            background-color: rgb(var(--B4));
        }
    }



}
</style>