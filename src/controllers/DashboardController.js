const Job = require('../model/Job');
const Profile = require('../model/Profile');
const JobUtils = require('../utils/JobUtils');

module.exports = {
    async index(req, res) {
    //ajustes no job.
    const jobs = await Job.get();
    const profile = await Profile.get();

    let statusCount = {
        progress: 0,
        done: 0,
        total: jobs.length,
    };
    //Total de hs/dia de cada trabalho em progresso.
    let jobTotalHours;

    const updatedJobs = jobs.map( (job) => {
        const remaining = JobUtils.calcRemainingDays(job);
        const status = remaining <= 0 ? 'done' : 'progress';
        const budget = JobUtils.calcBudget(job, profile["value-hour"]);
        //(Qtd de hs q qro trabalhar) => está no Profile.
        // - (menos).
        //(qtd de hs/dia de cada trabalho em andamento).
        const freeHours = profile["hours-per-day "] - jobTotalHours;

        //Somando a quantidade de status.
        statusCount[status] += 1;

        jobTotalHours = status == 'progress' ? jobTotalHours + Number(job["daily-hours"]) : jobTotalHours;
        
        return {
             //'...' = o que já existe + o que vem depois.
            ...job,
            //Daqui para baixo é o que será adicionado, ou seja, informação nova.
            remaining,
            status,
            budget,
        };
    });
    return res.render("index", { 
        jobs: updatedJobs, 
        profile: profile, 
        statusCount: statusCount,
        freeHours: freeHours,
     })
    },
};

