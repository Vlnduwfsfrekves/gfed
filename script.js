class CountdownTimer {
    constructor(settings){
        this.targetDate=settings.targetDate
        this.timerRef=document.querySelector(settings.selector)
        this.refs={
        days: this.timerRef.querySelector('[data-value="days"]'),
        hours: this.timerRef.querySelector('[data-value="hours"]'),
        mins: this.timerRef.querySelector('[data-value="mins"]'),
        secs: this.timerRef.querySelector('[data-value="secs"]'),
        }
        this.start()
    }
    start(){
        this.updateTimer()
        this.intervalId=setInterval(()=>{
            this.updateTimer()
        },1000)
    }
    updateTimer(){
        const currentTime=new Date().getTime()
        const time=this.targetDate-currentTime
        if(time<=0){
            this.stop()
            return
        }
      const days=Math.floor(time / (1000 *60 *60 *24))
      const hours=Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const mins=Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
      const secs=Math.floor((time % (1000 * 60)) / 1000)
      this.updateDisplay(days,hours,mins,secs)
    }
    updateDisplay(days,hours,mins,secs){
      this.refs.days.textContent=this.padValue(days)
      this.refs.hours.textContent=this.padValue(hours)
      this.refs.mins.textContent=this.padValue(mins)
      this.refs.secs.textContent=this.padValue(secs)
    }
    padValue(value){
        return String(value).padStart(2,'0')
    }
    stop(){
        clearInterval(this.intervalId)
        this.timerRef.innerHTML='<p class="expired">Timer has expired!</p>'
    }
}
new CountdownTimer({
    selector:'#timer-1',
    targetDate:new Date('Sept 17, 2023 00:00:00'),
})