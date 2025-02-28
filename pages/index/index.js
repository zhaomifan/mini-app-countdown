Page({
  data: {
    countdownTitle: '倒计时标题',
    endMessage: '',
    targetDate: '2025-04-01',
    targetTime: '00:00',
    countdownText: '',
    countdownInterval: null,
  },

  // 监听倒计时标题输入变化
  onTitleChange(e) {
    this.setData({
      countdownTitle: e.detail.value
    });
  },

  // 监听结束语输入变化
  onEndMessageChange(e) {
    this.setData({
      endMessage: e.detail.value
    });
  },

  // 监听目标时间选择变化
  onTargetTimeChange(e) {
    this.setData({
      targetTime: e.detail.value
    });
  },
  onTargetDateChange(e) {
    this.setData({
      targetDate: e.detail.value
    });
  },

  // 开始倒计时
  startCountdown() {
    if (!this.data.targetTime) {
      wx.showToast({
        title: '请选择目标时间',
        icon: 'none'
      });
      return;
    }
    if (this.data.countdownInterval) {
      clearInterval(this.data.countdownInterval);
    }
    const target = new Date(this.data.targetDate + " " +this.data.targetTime).getTime();
    console.log(target);
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        this.setData({
          countdownText: `${days} 天 ${hours} 小时 ${minutes} 分 ${seconds} 秒`
        });
      } else {
        clearInterval(interval);
        this.setData({
          countdownText: this.data.endMessage
        });
      }
    }, 1000);
    this.setData({
      countdownInterval: interval
    });
  }
});