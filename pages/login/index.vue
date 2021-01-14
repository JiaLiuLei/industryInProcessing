<template>
	<view class="container">
		<view class="top">
			<u-image width="448rpx" height="314rpx" :src="require('@/static/logo.png')" mode="aspectFit"></u-image>
			<u-form :model="form" ref="uForm" class="form" :error-type="['toast']">
				<u-form-item label-width="140" label="手机号码" prop="mobile">
					<u-input maxlength="11" v-model="form.mobile" placeholder="请输入手机号" />
				</u-form-item>
				<u-form-item label-width="140" label="验证码" prop="code">
					<u-input v-model="form.code" placeholder="请输入验证码" />
					<template slot="right">
						<u-verification-code start-text="获取验证码" :seconds="seconds" ref="uCode" @change="codeChange">
						</u-verification-code>
						<u-button type="success" size="mini" @tap="getCode">{{tips}}</u-button>
					</template>
				</u-form-item>
				<!-- <view class="remenber">
					<u-checkbox-group>
						<u-checkbox size="28" label-size="28" v-model="form.remenber" shape="circle">记住密码</u-checkbox>
					</u-checkbox-group>
				</view> -->
			</u-form>
		</view>
		<u-button type="primary" :custom-style="{width:'100%'}" @tap="submit">登录</u-button>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import * as api from "@/api/user";
	export default {
		name: "login",
		data() {
			return {
				tips: '',
				seconds: 60,
				form: {
					mobile: "",
					code: "",
					// remenber: false
				},
				rules: {
					mobile: [{
							required: true,
							message: '请输入手机号',
							trigger: 'change',
						},
						{
							validator: (rule, value, callback) => {
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							trigger: 'change',
						}
					],
					code: [{
						required: true,
						message: '请输入验证码',
						trigger: 'change'
					}]
				}
			}
		},
		methods: {
			submit() {
				this.$refs.uForm.validate(async valid => {
					if (valid) {
						try{
							const { mobile, code } = this.form;
							const result = await api.login({ phone:mobile, code });
							uni.setStorage({
							    key: 'token',
							    data: result.sign,
							    success (res) {
							        uni.redirectTo({url: "/pages/index/index"});
							    }
							});
						}catch(error){
							const { message } = error;
							this.$refs.uToast.show({
								title: message,
								type: 'error'
							})
						}
					}
				});
			},
			codeChange(text) {
				this.tips = text;
			},
			async getCode() {
				const {mobile} = this.form;
				if(!mobile) {
					this.$u.toast('请输入手机号');
					return;
				}
				if(!this.$u.test.mobile(mobile)){
					this.$u.toast('手机号码不正确');
					return;
				}
				if (this.$refs.uCode.canGetCode) {
					uni.showLoading({
						title: '正在获取验证码'
					})
					try{
						const code = await api.getCode({phone: mobile});
						uni.hideLoading();
						this.$u.toast('验证码已发送');
						this.$refs.uCode.start();
					}catch(error){
						const { message } = error;
						uni.hideLoading();
						this.$u.toast(message);
					}
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100vh;
		padding: 96rpx 40rpx 180rpx;

		.top {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.form {
			margin-top: 90rpx;
			width: 100%;

			.remenber {
				margin-top: 40rpx;
				text-align: right;
			}
		}

	}
</style>
