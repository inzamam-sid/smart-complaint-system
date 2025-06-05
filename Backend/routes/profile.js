const express = require('express');
const Joi = require('joi');
const userAuth = require('../middleware/userAuth');
const User = require('../models/User');

const profileRouter = express.Router();


profileRouter.get('/profile/view', userAuth, (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userProfile = {
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            department: user.department,
            profilePicture: user.profilePicture || null,
            createdAt: user.createdAt,
        };

        res.status(200).json({
            message: 'Profile fetched successfully',
            profile: userProfile,
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Schema for validating profile update data
const profileUpdateSchema = Joi.object({
    firstName: Joi.string().min(2).max(30),
    lastName: Joi.string().min(2).max(30),
    profilePicture: Joi.string().uri().allow('', null),
});


// Route to update user profile
profileRouter.patch('/profile/update', userAuth, async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate incoming data
        const { error, value } = profileUpdateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { firstName, lastName, profilePicture } = value;

        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            {
                $set: {
                    firstName: firstName || user.firstName,
                    lastName: lastName || user.lastName,
                    profilePicture: profilePicture || user.profilePicture,
                },
            },
            { new: true }
        );

        res.status(200).json({
            message: 'Profile updated successfully',
            profile: {
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                department: updatedUser.department,
                profilePicture: updatedUser.profilePicture,
            },
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = profileRouter;
