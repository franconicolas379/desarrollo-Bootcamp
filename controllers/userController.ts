import { request, Request, response, Response } from "express";
import User from "../models/user";

class UserController{
    async createUser(req: Request, res: Response) {
        try{
            const newUser = await User.create(req.body);
            console.log(newUser);
            return res.status(201).json(newUser);
        }catch(error){
            return res.status(500).json({ message: 'Error al crear el usuario.' })
        }
    }
    async getUsers(req: Request, res: Response) {
        try {
            const users = await User.find();

            return res.status(200).json(users);

        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener los usuarios.' });
        }
    }

    async deleteUser(req: Request, res: Response){
        try {
            const { userId } = req.params;

            if (!userId) {
                return res.status(400).json({ message: 'ID de usuario no proporcionado.' });
            }
            
            const result = await User.deleteOne({ _id: userId });
            
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado.' });
            }

            return res.status(200).json({ message: 'Usuario eliminado con éxito.' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al eliminar el usuario.' });
        }
    }

    async updateUser(req: Request, res: Response){
        try {
            const { userId } = req.params; 
            const updates = req.body; 

            if (!userId) {
                return res.status(400).json({ message: 'ID de usuario no proporcionado.' });
            }

            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado.' });
            }

            const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

            return res.status(200).json(updatedUser);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al actualizar el usuario.' });
        }
    }

    async getUser(req: Request, res: Response){
        
    }
}


export const userController = new UserController();