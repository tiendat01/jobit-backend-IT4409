var Company = require('../models').Company;
var User = require('../models').User;
var Work = require('../models').Work;
var TypeOfWork = require('../models').TypeOfWork;
exports.quantity = async (req, res) => {
    let numCompany = await Company.count({ distinct: true });
    let numUser = await User.count({ distinct: true });
    let numTypeOfWork = await TypeOfWork.count({ distinct: true });
    let numWork = await Work.count({ distinct: true, where: { censorship: 1 }, });
    let numWorkActive = await Work.count({
        distinct: true,
        where: { status: 1, censorship: 1 },
    });
    let numWorkUnActive = await Work.count({
        distinct: true,
        where: { status: 0, censorship: 1 },
    });
    // let numNew = await New.count({ distinct: true });
    // let numNewActive = await New.count({
    //     distinct: true,
    //     where: { status: 1 },
    // });
    // let numNewUnActive = await New.count({
    //     distinct: true,
    //     where: { status: 0 },
    // });
    res.json({
        data: {
            numCompany,
            numUser,
            numWork,
            numWorkActive,
            numWorkUnActive,
            // numNew,
            // numNewActive,
            // numNewUnActive,
            numTypeOfWork,
        },
    });
};
