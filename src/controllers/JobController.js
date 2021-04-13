const Job = require('../model/Job');
const Profile = require('../model/Profile');
const JobUtils = require('../utils/JobUtils');

module.exports = {    
    create(req, res) {        
        return res.render("job")
    },
    async save(req, res) {        
        //Pega os dados preenchidos no formulário.        
        await Job.create({    
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now() //Pega a data atual.
        });
        //Redireciona a página inicial.
        return res.redirect('/');
    },
    async show(req, res) {
        const jobs = await Job.get();
        const profile = await Profile.get();
        const jobId = req.params.id;
        const job = jobs.find( job => Number(job.id) === Number(jobId));

        if (!job) {
            return res.send('Informação não encontrada.')
        }

        job.budget = JobUtils.calcBudget(job, profile["value-hour"]);
        
        return res.render("job-edit", { job })
    },
    async update(req, res) {
        const jobs = await Job.get();
                
        const updatedJob = {
            //'...' = espalha as informações obtida no objeto updatedJobs.
            //...job,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],                
        }

        await Job.update(updatedJob, jobId);

        res.redirect('/job/' + jobId); 
    },
    async delete(req, res) {        
        const jobId = req.params.id;

        await Job.delete(jobId);

        return res.redirect('/')
    },
}

