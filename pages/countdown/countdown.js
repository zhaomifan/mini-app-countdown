Page({
  data: {
    countdownTitle: '倒计时标题',
    endMessage: '',
    targetDate: '',
    targetTime: '00:00',
    countdownText: '',
    countdownInterval: null,
  },
  onLoad() {
    // 获取明天的日期
    const tomorrow = this.getTomorrowDate();
    // 设置 targetDate 为明天的日期
    this.setData({
      targetDate: tomorrow
    });
  },
  // 获取明天日期的方法
  getTomorrowDate() {
    // 创建一个 Date 对象，获取当前日期和时间
    const currentDate = new Date();
    // 获取当前日期
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    // 创建一个新的 Date 对象，设置为明天的日期
    const tomorrow = new Date(currentYear, currentMonth, currentDay + 1);
    // 获取明天的年、月、日
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    // 格式化日期为 YYYY-MM-DD 格式
    return `${year}-${month}-${day}`;
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