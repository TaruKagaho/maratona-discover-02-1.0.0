module.exports = {
    calcRemainingDays (job) {
        //Cálculo de tempo restante.
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
            
        const createdDate = new Date(job.created_at);
        const dueDay = createdDate.getDay() + Number(remainingDays);
        const dueDateInMs = createdDate.setDate(dueDay);
        const timeDiffInMs = dueDateInMs - Date.now();
    
        //Transformar milissegundos em dias.
        const dayInMs = 24 * 60 * 60 * 1000;
        const dayDiff = Math.floor(timeDiffInMs / dayInMs);
    
        //Restam x dias.
        return dayDiff
    },
    calcBudget: (job, valueHour) => valueHour * job["total-hours"],
}

