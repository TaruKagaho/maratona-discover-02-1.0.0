const Profile = require('../model/Profile');

module.exports = {
    async index(req, res) {        
        return res.render("profile", { profile: await Profile.get() });
    }, 
    async updated(req, res) {
        //Usar o req.body para pegar os dados.
        const data = req.body;
        //Definir quantas semanas tem um ano = 52.
        const weeksPerYear = 52;
        //Remover as semanas de férias do ano para obter quantas semanas tem e, 1 mês.
        const weeksPerMounth = (weeksPerYear - data["vacation-per-year"]) / 12;
        //Quantas horas por semana estou trabalhando.
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"];
        //Total de horas trabalhadas no mês.
        const mounthlyTotalHours = weekTotalHours * weeksPerMounth;
        //Valor da hora trabalhada.        
        const valueHour = data["monthly-budget"] / mounthlyTotalHours;
        //Atualizar os dados do Profile.
        const profile = await Profile.get()
        await Profile.update({
            ...profile,
            ...req.body,
            "value-hour": valueHour
        })
        return res.redirect('/profile')
    },
}
