<template lang="html">
  <div class="container"
    @keyup.74="handleBottom">
		<div class="main">
			<div class="decorate">
				<div class="top-dot">
					<span class="left-dot"></span>
					<span class="left-dot"></span>
					<span class="left-dot"></span>
					<span class="left-dot"></span>
					<span class="left-dot"></span>
					<span class="right-dot"></span>
					<span class="right-dot"></span>
					<span class="right-dot"></span>
					<span class="right-dot"></span>
					<span class="right-dot"></span>
				</div>
				<h1>俄罗斯方块</h1>
				<div class="right-pattern">
					<b class="dot"></b>
					<em></em>
					<b class="dot"></b>
					<b class="dot"></b>
					<em></em>
					<b class="dot"></b>
					<p></p>
					<em></em>
					<b class="dot"></b>
					<b class="dot"></b>
					<b class="dot"></b>
					<em></em>
					<b class="dot"></b>
					<p></p>
					<b class="dot"></b>
					<b class="dot"></b>
					<b class="dot"></b>
					<b class="dot"></b>
					<p></p>
					<b class="dot"></b>
					<em></em>
					<b class="dot"></b>
					<b class="dot"></b>
					<b class="dot"></b>
					<p></p>
					<b class="dot"></b>
					<b class="dot"></b>
					<b class="dot"></b>
					<em></em>
					<b class="dot"></b>
					<p></p>
					<em></em>
					<b class="dot"></b>
					<em></em>
					<b class="dot"></b>
					<em></em>
					<b class="dot"></b>
					<em></em>
					<b class="dot"></b>

				</div>
				<div class="left-pattern">
					<em></em>
					<b class="dot"></b>
					<b class="dot"></b>
					<b class="dot"></b>
					<b class="dot"></b>
					<p></p>
					<b class="dot"></b>
					<em></em>
					<b class="dot"></b>
					<b class="dot"></b>
					<b class="dot"></b>
					<p></p>
					<b class="dot"></b>
					<b class="dot"></b>
					<b class="dot"></b>
					<b class="dot"></b>
					<p></p>
					<em></em>
					<b class="dot"></b>
					<b class="dot"></b>
					<b class="dot"></b>
					<em></em>
					<b class="dot"></b>
					<p></p>
					<b class="dot"></b>
					<b class="dot"></b>
					<em></em>
					<b class="dot"></b>
					<em></em>
					<b class="dot"></b>
					<p></p>
					<b class="dot"></b>
					<em></em>
					<b class="dot"></b>
					<em></em>
					<b class="dot"></b>
					<em></em>
					<b class="dot"></b>
					<em></em>
				</div>
			</div>
			<div class="screen">
				<div class="panel">
					<div class="grid" id="js-grid">
						<p v-for="n in 20">
							<b v-for="i in 10"
              ></b>
						</p>
					</div>
					<div class="logo">
						<div class="dinosour"></div>
						<!-- <p>俄罗斯方块<br>TETRIS</p> -->

					</div>
					<div class="status">
						<div>
							<p>最高分</p>
							<div class="score">
								<span></span>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
							</div>
							<p>起始行</p>
							<div class="number">
								<span></span>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
							</div>
							<p>级别</p>
							<div class="number">
								<span></span>
							</div>
							<p>下一个</p>
							<div class="next"></div>
							<div class="bottom">
								<div class="music"></div>
								<div class="pause"></div>
								<div class="number">
									<span></span>
									<span></span>
									<span></span>
									<span></span>
									<span></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="buttons">
			<div class="button-normal button-top"
        @click="handleTop"
        @keyup.75="handleTop">
				<i></i>
				<em></em>
				<span>旋转</span>
			</div>
			<div class="button-normal button-bottom"
        @click="handleBottom"
        @keyup.74="handleBottom">
				<i></i>
				<em></em>
				<span>下移</span>
			</div>
			<div class="button-normal button-left"
        @click="handleLeft"
        @keyup.72="handleLeft">
				<i></i>
				<em></em>
				<span>左移</span>
			</div>
			<div class="button-normal button-right"
        @click="handleRight"
        @keyup.76="handleRight">
				<i></i>
				<em></em>
				<span>右移</span>
			</div>
			<div class="button-big"
        @click="handleDrop"
        @keyup.68="handleDrop">
				<i></i>
				<span>掉落(SPACE)</span>
			</div>

			<div class="button-small button-s3"
        @click="handleRestart">
				<i></i>
				<span>重玩(R)</span>
			</div>
			<div class="button-small button-s2">
				<i></i>
				<span>音效(S)</span>
			</div>
			<div class="button-small button-s1"
        @click="handlePause">
				<i></i>
				<span>暂停(P)</span>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { isBottomAvailable } from '../util/check.js'

export default {
  data() {
    return {
    }
  },

  computed: {
    ...mapState([
      'current',
      'grid'
    ]),
  },

  mounted() {
  },

  methods: {
    ...mapMutations([
      'moveLeft',
      'moveRight',
      'moveBottom',
      'drop',
      'rotate'
    ]),

    render() {
      let shape = this.current.shape
      let x = this.current.x
      let y = this.current.y
      let renderArr = []
      let box = document.querySelectorAll('#js-grid b')

      let startPoint = x * 10 + y
      for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[0].length; j++) {
          if (shape[i][j] === 1) {
            let temp = startPoint + j + (i * 10)
            renderArr.push(temp)
          }
        }
      }

      for (let i = 0; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid[0].length; j++) {
          if (this.grid[i][j] === 1) {
            renderArr.push(i * 10 + j)
          }
        }
      }

      ;[...box].forEach(e => {
        if (e && e.classList.contains('highlight')) {
          e.classList.remove('highlight')
        }
      })

      renderArr.forEach(e => {
        if (e && e >= 0) {
          box[e].classList.add('highlight')
        }
      })
    },

    handleTop() {
      this.rotate()
      this.render()
    },

    handleBottom() {
      this.moveBottom()
      this.render()
    },

    handleLeft() {
      this.moveLeft()
      this.render()
    },

    handleRight() {
      this.moveRight()
      this.render()
    },

    handleDrop() {
      this.drop()
      this.render()
    },

    handlePause() {
      console.log('pause')
    },

    handleRestart() {
      console.log('restart')
    }
  }

}
</script>

<style lang="scss">
// html, body, #app {
//   height: 100%;
// }

* {
	box-sizing: border-box;
	padding: 0;
	margin: 0;
}

.highlight {
  border-color: #000 !important;

  &:after {
    background-color: #000 !important;
  }
}


@mixin box {
	width: 20px;
	height: 20px;
	display: block;
	float: left;
	padding: 2px;
	border: 2px solid #879372;
	margin: 0 2px 2px 0;

	&:after {
		content: '';
		display: block;
		width: 12px;
		height: 12px;
		background-color: #879372;
	}
}

@mixin button-style {

	display: block;
	position: relative;
	border: 1px solid #000;
	border-radius: 50%;
	box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
	background: -webkit-gradient(linear, left top, left bottom, from(#6e77ef), to(#4652f3));

	&:after, &:before {
		content: '';
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 50%;
		box-shadow: 0 5px 10px rgba(255, 255, 255, 0.8) inset;
	}

	&:after {
		box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.8) inset;
	}
}

.container {
	width: 100%;
	max-width: 640px;
	height: 80%;
	margin: 0 auto;
	padding-top: 42px;
	// padding-top: 6.5%;
	box-shadow: 0 0 10px #fff inset;
	border-radius: 20px;
	background-color: #eeca1a; // main color
  // background-color: #fff;

	.main {
		width: 480px;
		// width: 75%;
		height: 75%;
		position: relative;
		margin: 0 auto;
		padding: 45px 0 35px;
		border: solid #000;
		border-width: 0 10px 10px;

		.decorate {

			.top-dot {
				width: 100%;
				height: 10px;
				position: absolute;
				top: 0;
				left: 0;
				overflow: hidden;

				span {
					width: 10px;
					height: 10px;
					display: block;
					margin-right: 10px;
					background-color: #000;
				}

				.left-dot {
					float: left;
				}

				.left-dot:first-child {
					width: 40px;
				}

				.right-dot {
					float: right;
				}

				.right-dot:nth-child(6){
					width: 40px;
					margin-right: 0;
				}
			}

			h1 {
				width: 100%;
				position: absolute;
				top: -12px;
				left: 0;
				text-align: center;
			}

			.right-pattern, .left-pattern {
				width: 44px;
				position: absolute;
				top: 20px;

				b {
					@include box;
				}

				.dot {
					border-color: #000;

					&:after {
						background-color: #000;
					}
				}

				em {
					display: block;
					width: 22px;
					height: 22px;
					float: left;
				}

				p {
					height: 22px;
					clear: both;
				}
			}

			.right-pattern {
				right: -70px;
			}

			.left-pattern {
				left: -70px;
			}

		}

		.screen {
			width: 390px;
			// width: 81.2%;
			height: 78.2%;
			margin: 0 auto;
			position: relative;
			border: 5px solid;
			border-color: #987f0f #fae36c #fae36c #987f0f;

			.panel {
				width: 380px;
				// width: 97.4%;
				height: 468px;
				margin: 0 auto;
				padding: 8px;
				border: 2px solid #494536;
				background-color: #9ead86;

				.grid {
					width: 228px;
					// width: 60%;
					height: 100%;
					padding: 3px 1px 1px 3px;
					border: 2px solid #000;

					b {
						@include box;
					}
				}

				.logo {
					// width: 224px;
					width: 58.9%;
					height: 200px;
					position: absolute;
					top: 100px;
					left: 12px;
					text-align: center;
					overflow: hidden;

					.dinosour {
						background: url('//img.alicdn.com/tps/TB1qq7kNXXXXXacXFXXXXXXXXXX-400-186.png') no-repeat;
						background-position: 0 -100px;
						overflow: hidden;
					}
				}

				.status {
					width: 108px;
					// width: 28.4%;
					position: absolute;
					top: 0;
					right: 15px;

					p {
						height: 57px;
						line-height: 47px;
						padding: 10px 0 0;
						white-space: nowrap;
						clear: both;
					}

					.number {
						height: 24px;
						float: right;
						font-size: 14px;

						span {
							width: 14px;
							height: 24px;
							float: left;
							background: url('//img.alicdn.com/tps/TB1qq7kNXXXXXacXFXXXXXXXXXX-400-186.png') no-repeat;
							background-position: -215px -25px;
							overflow: hidden;
						}
					}

					.bottom {
						position: absolute;
						width: 114px;
						top: 426px;
						left: 0;

						.music {
							width: 25px;
							height: 21px;
							position: absolute;
							top: 2px;
							left: -12px;
							background: url('//img.alicdn.com/tps/TB1qq7kNXXXXXacXFXXXXXXXXXX-400-186.png') no-repeat;
							background-position: -175px -75px;
						}

						.pause {
							width: 20px;
							height: 18px;
							position: absolute;
							top: 3px;
							left: 18px;
							background: url('//img.alicdn.com/tps/TB1qq7kNXXXXXacXFXXXXXXXXXX-400-186.png') no-repeat;
							background-position: -100px -75px;
						}
					}
				}
			}
		}
	}

	.buttons {
		width: 580px;
		// width: 90.62%;
		height: 330px;
		margin: 20px auto 0;
		position: relative;

		.button-normal {
			position: absolute;
			line-height: 1.6;
			white-space: nowrap;
			text-align: center;
			color: #111;

			i {
				@include button-style;
				width: 100px;
				height: 100px;
			}

			em {
				display: block;
				width: 0;
				height: 0;
				position: absolute;
				top: 50%;
				left: 50%;
				margin: -12px 0 0 -8px;
				border: 8px solid;
				border-color: transparent transparent #111;
			}
		}

		.button-top {
			top: 0;
			left: 374px;

			em {
				transform: translate(0, 63px) scale(1, 2);;
			}

			span {
				position: absolute;
				top: 5px;
				left: 102px;
			}
		}

		.button-bottom {
			top: 180px;
			left: 374px;

			em {
				transform: translate(0px, -71px) rotate(180deg) scale(1, 2);
			}
		}

		.button-left {
			top: 90px;
			left: 284px;

			em {
				transform: translate(60px, -12px) rotate(270deg) scale(1, 2);
			}
		}

		.button-right {
			top: 90px;
			left: 464px;

			em {
				transform: translate(-60px, -12px) rotate(90deg) scale(1, 2);
			}
		}


		.button-big {
			position: absolute;
			line-height: 1.6;
			white-space: nowrap;
			text-align: center;
			color: #111;

			top: 100px;
			left: 52px;

			i {
				@include button-style;
				width: 160px;
				height: 160px;
			}
		}

		.button-small {
			position: absolute;
			font-size: 16px;

			i {
				@include button-style;
				width: 52px;
				height: 52px;

					&:after, &:before {
						box-shadow: 0 4px 10px rgba(255, 255, 255, 0.8) inset;
					}

					&:after {
						box-shadow: 0 -3px 10px rgba(0, 0, 0, 0.8) inset;
					}
			}
		}

			.button-s3 {
				top: 0;
				left: 196px;

				i {
					background: -webkit-gradient(linear, left top, left bottom, from(#dc3333), to(#de0000));
				}
			}

			.button-s2 {
				top: 0;
				left: 106px;

				i {
					background: -webkit-gradient(linear, left top, left bottom, from(#4bc441), to(#0ec400));
				}
			}

			.button-s1 {
				top: 0;
				left: 16px;

				i {
					background: -webkit-gradient(linear, left top, left bottom, from(#4bc441), to(#0ec400));
				}
			}
	}
}
</style>
