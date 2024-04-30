<template>
	<div id="footer">
		<ul id="viewBtnGroup">
			<li id="" class="ViewBtn" :class="{ currentView: currentView === 'view1' }" @click="currentView = 'view1'">
				<p>頁面1</p>
			</li>
			<li id="" class="ViewBtn" :class="{ currentView: currentView === 'view2' }" @click="currentView = 'view2'">
				<p>頁面2</p>
			</li>
			<li id="" class="ViewBtn" :class="{ currentView: currentView === 'view3' }" @click="currentView = 'view3'">
				<p>頁面3</p>
			</li>
			<li id="" class="ViewBtn" :class="{ currentView: currentView === 'view4' }" @click="currentView = 'view4'">
				<p>頁面4</p>
			</li>
			<li id="" class="ViewBtn" :class="{ currentView: currentView === 'view5' }" @click="currentView = 'view5'">
				<p>頁面5</p>
			</li>
		</ul>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from "vuex";
const store = useStore();
const currentView = computed({
	set(value) { // 改變 <select> 時，set 會被觸發更新 'SET_CURRENT_VIEW'
		store.commit("SET_CURRENT_VIEW", value);
	},
	get() { // 'SET_CURRENT_VIEW' 被更新後會被觸發 get 更新 currentView
		return store.getters.CURRENT_VIEW;
	},
});
</script>

<style lang="scss" scoped>
#footer {
	width: 100%;
	height: 3em;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	z-index: 10;

	#viewBtnGroup {
		width: calc(100% - 50em);
		height: 100%;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		list-style: none;

		.ViewBtn {
			width: 10em;
			height: 3em;
			background-image: url("../assets/image/page_BTN_OFF.png");
			background-size: 10em auto;
			background-repeat: no-repeat;
			background-position: bottom;
			display: flex;
			justify-content: center;
			align-items: center;
			color: var(--BLUE);
			cursor: pointer;

			p {
				margin-top: 2px;
			}
		}

		.currentView {
			color: white;
			background-image: url("../assets/image/page_BTN_ON.png");
		}

	}
}
</style>
