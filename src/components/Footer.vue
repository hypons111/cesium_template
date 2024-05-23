<template>
	<div id="footer">
		<ul id="viewBtnGroup">
			<li id="" class="ViewBtn" :class="{ currentView: currentView === 'view1' }" @click="currentView = 'view1'">
				<font-awesome-icon icon="fa-solid fa-house" />
				<p>頁面1</p>
			</li>
			<li id="" class="ViewBtn" :class="{ currentView: currentView === 'view2' }" @click="currentView = 'view2'">
				<font-awesome-icon icon="fa-solid fa-solar-panel" />
				<p>頁面2</p>
			</li>
			<li id="" class="ViewBtn" :class="{ currentView: currentView === 'view3' }" @click="currentView = 'view3'">
				<font-awesome-icon :icon="['fas', 'bullhorn']" />
				<p>頁面3</p>
			</li>
			<li id="" class="ViewBtn" :class="{ currentView: currentView === 'view4' }" @click="currentView = 'view4'">
				<font-awesome-icon :icon="['fas', 'door-closed']" />
				<p>頁面4</p>
			</li>
			<li id="" class="ViewBtn" :class="{ currentView: currentView === 'view5' }" @click="currentView = 'view5'">
				<font-awesome-icon :icon="['fas', 'location-dot']" />
				<p>頁面5</p>
			</li>
			<li id="" class="ViewBtn" :class="{ currentView: currentView === 'view6' }" @click="currentView = 'view6'">
				<font-awesome-icon :icon="['fas', 'link']" />
				<p>頁面6</p>
			</li>
			<li id="" class="ViewBtn" :class="{ currentView: currentView === 'view7' }" @click="currentView = 'view7'">
				<font-awesome-icon :icon="['fas', 'vr-cardboard']" />
				<p>頁面7</p>
			</li>
			<li id="" class="ViewBtn" :class="{ currentView: currentView === 'view8' }" @click="currentView = 'view8'">
				<font-awesome-icon :icon="['fas', 'cubes-stacked']" />
				<p>頁面8</p>
			</li>
		</ul>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from "vuex";
const store = useStore();
const currentView = computed({
	get() { return store.getters.CURRENT_VIEW; }, // 'SET_CURRENT_VIEW' 被更新後會被觸發 get 更新 currentView
	set(value) { store.commit("SET_CURRENT_VIEW", value); } // 改變 <select> 時，set 會被觸發更新 'SET_CURRENT_VIEW'
});
</script>

<style lang="scss" scoped>
#footer {
	width: 100%;
	height: 3em;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	color: rgb(var(--WHITE));
	font-weight: bold;
	z-index: 10;

	#viewBtnGroup {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-evenly;
		align-items: stretch;
		list-style: none;

		.ViewBtn {
			flex-grow: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			color: rgb(var(--GRAY5));
			cursor: pointer;

			// 有底圖
			// background-image: url("../assets/image/page_BTN_OFF.png");
			// background-size: 10em auto;
			// background-repeat: no-repeat;
			// background-position: bottom;

			// 沒有底圖
			background-color: rgb(var(--B8));

			p {
				margin: 3px 0 0 0.5em;
			}
		}

		.currentView {
			color: rgb(var(--WHITE));
			background-color: rgb(var(--BLUE));
			// background-image: url("../assets/image/page_BTN_ON.png");
		}

	}
}
</style>
