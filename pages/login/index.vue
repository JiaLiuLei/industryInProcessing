<template>
	<view class="container">
		<view class="top">
			<u-image width="448rpx" height="314rpx" :src="require('@/static/logo.png')" mode="aspectFit"></u-image>
			<u-form :model="form" ref="uForm" class="form" :error-type="['toast']">
				<u-form-item label-width="140" label="手机号码" prop="mobile">
					<u-input maxlength="11" type="number" v-model="form.mobile" placeholder="请输入手机号" />
				</u-form-item>
				<u-form-item label-width="140" label="验证码" prop="code">
					<u-input maxlength="6" type="number" v-model="form.code" placeholder="请输入验证码" />
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
	</view>
</template>

<script>
	import * as api from "@/api/user";
	import igexinTool from "@/util/igexinTool";
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
						try {
							const {
								mobile,
								code
							} = this.form;
							const result = await api.login({
								phone: mobile,
								code
							});
							var result2 = {
								"action": null,
								"admin": {
									"id": "1304258162437767169",
									"name": "管理员"
								},
								"avatar": "",
								"createtime": "1612447743",
								"extend": null,
								"friends": [],
								"groups": [],
								"id": "1346430184940666882",
								"isdelete": 0,
								"jwtKey": "{\"source\":\"jb.jxj.jwt\",\"name\":\"梁代玉\"}",
								"name": "梁代玉",
								"nick": "梁代玉",
								"online": 0,
								"sign": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzQ2NDMwMTg0OTQwNjY2ODgyIiwiZXhwIjoxNjEyNTM0MTQzLCJ1c2VySWQiOjEzNDY0MzAxODQ5NDA2NjY4ODIsImlhdCI6MTYxMjQ0Nzc0MywiYWNjb3VudCI6IjMwMjIzNCIsInVzZXJLZXkiOiJqYi5qeGouand0In0.Pt55OUnOL0AYkqEijzMl7H5jq9AtfjvjS1UaY_TkteYdwKfDKiQNqCMJZhxe1WTvcUnlqBaW0ljS6pJfq57KPw",
								"source": "jb.jxj.jwt",
								"terminal": "",
								"unique": "302234",
								"userId": "1346430184940666882"
							}
							uni.setStorage({
								key: 'token',
								data: result.sign,
								success(res) {
									
									//存用户登录信息
									console.log(result);
									// console.log('警号：' + result.unique);
									uni.setStorage({
										key: 'userinfo',
										data: result,
										success: (res) => {
										}
									});
									uni.redirectTo({
										url: "/pages/index/index"
									});
									//个推绑定别名
									var tool = new igexinTool();
									tool.bindAlias(result.unique);
									tool.turnOnPush();
								}
							});
						} catch {}
					}
				});
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				const {
					mobile
				} = this.form;
				if (!mobile) {
					this.$u.toast('请输入手机号');
					return;
				}
				if (!this.$u.test.mobile(mobile)) {
					this.$u.toast('手机号码不正确');
					return;
				}
				if (this.$refs.uCode.canGetCode) {
					api.getCode({
						phone: mobile
					}).then(result => {
						this.$u.toast('验证码已发送');
						this.$refs.uCode.start();
					})
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
			uni.hideLoading();
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
