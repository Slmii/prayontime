export default () => {
    self.addEventListener("message", e => {
        if (!e) return;
        
        const { seconds, minutes, hours } = e.data;
        
        setTimeout(() => {
            const newSeconds = seconds - 1;
            const newMinutes = (newSeconds < 0) ? minutes - 1 : minutes;
            const newHours   = (newMinutes < 0) ? hours - 1 : hours;

            postMessage({ newSeconds, newMinutes, newHours });
        }, 1000);
    });
}