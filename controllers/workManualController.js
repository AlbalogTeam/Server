import WorkManual from "../models/location/workManual";
import Location from "../models/location/location";
import Board from "../models/location/board";
export const createWorkManual = async (req, res) => {

    const {locationId} = req.params;

    try {
        const workManual = new WorkManual({
                ...req.body,
                owner:req.owner._id
            });

        const location = await Location.findById( { _id: locationId });
        const boardId = location.board;
        const board = await Board.findById( {_id: boardId });

        if(!workManual) {
            res.status(500).send({
                message: "Cannot create Manual"
            });
        }
        console.log(workManual);
        await workManual.save();

        console.log("보드" + board);

        board.manuals.push(workManual);

        await board.save();

        res.status(201).send({
            message: "Create Manual Successfully"
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: err.toString()
        });
    }
};

export const readWorkManual = async (req, res) => {

    try {
        const workManual = await WorkManual.find();

        if(!workManual) {
            res.status(500).send({
                message: "Cannot read Manual"
            });
        }

        res.status(201).send({
            workManual
        });

    }catch (err) {
        res.status(500).send({
            message: err
        });
    }
};

export const readOneWorkManual = async (req, res) => {
    try {
        const { _id } = req.params;
        const workManual = await WorkManual.findById({ _id });
        if(!workManual) {
            res.status(500).send({
                message: "Cannot find One Manual"
            });
        }
        res.status(201).send({
            workManual
        });
    }catch (err) {
        res.status(500).send({
            message: err
        });
    }
}

export const updateWorkManual = async (req, res) => {
    try {

        if(!req.onwer) {
            throw new Error("You are not owner");
        }

        const { _id } = req.params;
        const { title, content } = req.body;

        const workManual = await WorkManual.findByIdAndUpdate({ _id }, {
            title,
            content
        });

        if(!workManual) {
            res.status(500).send({
                message: "Cannot Update Manual"
            });
        }

        res.status(201).send({
            updatedWorkManual: workManual
        });

    }catch (err) {
        res.status(500).send({
            message: err
        });
    }
}

export const deleteWorkManual = async (req, res) => {
    try {

        if(!req.onwer) {
            throw new Error("You are not owner");
        }
        const { _id } = req.params;

        const workManual = await WorkManual.findByIdAndDelete({ _id} );

        if(!workManual) {
            res.status(500).send({
                message: "Cannot Delete Manual"
            });
        }

        res.status(201).send({
            deletedWorkManual: workManual
        });
    } catch (err) {
        res.status(500).send({
            message: err
        });
    }
}