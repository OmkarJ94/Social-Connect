const express = require('express');
const router = express.Router()
const User = require('../Models/User')
const jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs');
const otp = require('../Models/Otp')
const nodemailer = require('nodemailer');
const Message = require("../Models/Message")
const Post = require("../Models/Post")
router.post("/signup", async (req, res) => {
    try {

        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(203).json({ message: "Enter Valid Credentials" });
        }

        var salt = bcrypt.genSaltSync(10);
        var hashpassword = bcrypt.hashSync(password, salt);

        const newuser = new User({ username, email, password: hashpassword })
        await newuser.save();
        const token = jwt.sign({ _id: newuser._id }, process.env.secret)
        res.status(200).json({ message: "Signup Successfully", token })

    }
    catch (e) {

        res.status(203).json({ message: "Enter Valid Credentials" });
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email });

        if (user) {
            const isValid = await bcrypt.compare(password, user.password)

            if (isValid) {
                const token = jwt.sign({ _id: user._id }, process.env.secret)

                res.status(200).json({ message: "Login Successfully", user, token });
            }
            else {
                res.status(203).json({ message: "Enter Valid Credentials" });
            }
        }
        else {
            res.status(203).json({ message: "Enter Valid Credentials" });
        }
    } catch (error) {

        return res.status(203).json({ message: "Enter Valid Credentials" });

    }
})

router.post("/sendotp", async (req, res) => {
    try {

        const { email, id } = req.body;


        if (!email) {

            return res.status(404).json({ error: "User Not Found" })
        }
        const result = await User.findOne({ email: email })

        if (result === null && id != 2) {
            let user = await new User({ email })
            await user.save()
        }

        const code = Math.floor(Math.random() * 10000 + 1)
        let Code = new otp({
            email,
            Otp: code,
            expireIn: new Date().getTime() + 300 * 1000
        })
        const response = await Code.save()
        mailer(email, code)
        res.status(200).json({ message: "OTP Send Your Mail Id", code })

    } catch (error) {


        res.status(404).json({ message: "Something went wrong" })
    }

})


router.post("/changeusername", async (req, res) => {
    try {
        let { email, UserName } = req.body;

        const result = await User.findOne({ username: UserName });

        if (result === null) {
            const user = await User.findOneAndUpdate({ email }, { username: UserName }, { new: true })

            res.status(200).json({ message: "Your username is changed" })
        }
        else {
            res.status(403).json({ message: "This username is not available" })
        }
    } catch (error) {
        res.status(403).json({ message: "This username is not available" })

    }
})

router.post("/setPassword", async (req, res) => {
    try {
        let { password, email } = req.body
        var salt = bcrypt.genSaltSync(10);
        var hashpassword = bcrypt.hashSync(password, salt);

        let user = await User.findOneAndUpdate({ email }, { password: hashpassword }, { new: true });

        if (user) {
            res.status(200).json({ message: "Password Set Succesfully" })
        }
        else {
            res.status(403).json({ message: "Something Went Wrong" })
        }

    } catch (error) {
        res.status(403).json({ message: "Something Went Wrong" })
    }
})

router.post("/chnagedescription", async (req, res) => {
    try {
        const { email, description } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            user.description = description;
            user.save();
            res.status(200).json({ message: "Description updated successfully" })
        }
        else {
            res.status(403).json({ message: "Something Went Wrong" })
        }

    } catch (error) {
        res.status(403).json({ message: "Something Went Wrong" })

    }
})

router.post("/setprofilepicture", async (req, res) => {
    try {
        const { email, url } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            user.profilepic = url;
            user.save();
            res.status(200).json({ message: "Your profile picture updated successfully" })
        }
        else {
            res.status(403).json({ message: "Something went wrong" })
        }
    } catch (error) {
        res.status(403).json({ message: "Something went wrong" })
    }
})

const mailer = (mail, otp) => {
    try {

        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: false,

            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        let mailDetails = {
            from: process.env.EMAIL,
            to: mail,
            subject: 'Email For Forgot Password',
            html: `
            Your OTP for changing password is ${otp}`
        };

        mailTransporter.sendMail(mailDetails, function (err, data) {

            if (err) {


            } else {

            }
        })
    } catch (error) {
        (error)

    }
}

router.post("/user", async (req, res) => {
    try {
        const { authorization } = req.headers;
        const { email } = req.body
        if (!authorization) {
            return res.status(401).json({ message: "You must be logged in" })
        }

        const token = authorization.replace(process.env.key, "");

        const result = jwt.verify(token, process.env.secret)
        if (result) {
            const loginuser = await User.findOne({ _id: result._id })
            const fuser = await User.findOne({ email })

            res.status(200).json({ loginuser, fuser })
        }
        else {
            res.status(403).json({ message: "You must be logged in" })
        }
    } catch (error) {
        res.status(402).json({ message: error.message })
    }
})

router.post("/changepassword", async (req, res) => {
    try {
        const { email, newPassword, oldPassword } = req.body;
        const user = await User.findOne({ email });
        const isValid = await bcrypt.compare(oldPassword, user.password)

        if (isValid) {
            var salt = bcrypt.genSaltSync(10);
            var hashpassword = bcrypt.hashSync(newPassword, salt);
            user.password = hashpassword
            user.save();
            res.status(200).json({ message: 'Password Changed Successfully' })
        }
        else {
            res.status(403).json({ message: "Enter Valid Credentials" })
        }
    } catch (error) {
        res.status(403).json({ message: "Something Went Wrong" })
    }
})

router.post("/addpost", async (req, res) => {
    try {
        const { email, image, caption } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            const post = await new Post({ url: image, caption, likes: [], comments: [], profilepic: user.profilepic, username: user.username, email: user.email })
            post.save();
            res.status(200).json({ message: "Posts Added Successfully" })
        }
        else {
            res.status(403).json({ message: "Something Went Wrong" })
        }
    } catch (error) {
        res.status(403).json({ message: "Something Went Wrong" })

    }
})

router.post("/searchuser", async (req, res) => {
    try {
        const { keyword, id, _id } = req.body;
        const loginUser = await User.findById(_id)
        let data = [];
        let users;
        if (id === 1) {
            users = await User.find({ username: { $regex: keyword, $options: 'i' } })
            data = users.filter((item) => {
                if (((loginUser.following).includes(item.username)) || ((loginUser.followers).includes(item.username))) {
                    return item;
                }
            })
            res.status(200).send(data)
        }
        else if (id != 1) {

            users = await User.find({ username: { $regex: keyword, $options: 'i' } })
            if (users) {

                users.map((item) => {
                    data.push({
                        _id: item._id,
                        username: item.username,
                        email: item.email,
                        description: item.description,
                        profilepic: item.profilepic,
                        posts: item.posts,
                        followers: item.followers,
                        following: item.following
                    })
                })
                res.status(200).json({ data })
            }
        }


        else {
            res.status(403).json({ message: 'No User Found' })
        }

    } catch (error) {
        
        res.status(403).json({ message: "Something wemt wrong" });

    }
})

router.post("/follouser", async (req, res) => {
    try {
        const { loginuser, follower } = req.body
        const user = await User.findOne({ username: loginuser });
        let data = [];

        if (user && !((user.following).includes(follower))) {
            (user.following).push(follower)
            user.save()

        }
        else {
            user.following = (user.following).filter((item) => {
                if (item != follower) {
                    return item;
                }
            })
            user.save()
        }

        const user1 = await User.findOne({ username: follower })
        if (user1 && !((user1.followers).includes(loginuser))) {
            (user1.followers).push(loginuser)
            user1.save()
        }
        else {
            user1.followers = (user.following).filter((item) => {
                if (item != loginuser) {
                    return item;
                }
            })
            user1.save()
        }
        res.status(200).json({ message: "successfull", user1 })
    } catch (error) {
        res.status(403).json({ message: "Something Went Wrong" })

    }
})

router.post("/savemessage", async (req, res) => {
    try {

        const { senderid, message, roomid, recieverid, senderUserName, recieverUserName } = req.body.messagedata;

        const newmessage = new Message({ senderid, message, roomid, recieverid, reciever_username: recieverUserName, sender_username: senderUserName })


        if (newmessage) {
            newmessage.save()
            res.status(200).json({ message: newmessage })
        }
        else {
            res.status(422).json({ message: "Something Went Wrong" })
        }
    } catch (error) {
        res.status(422).json({ message: error.message })
    }
})

router.post("/getmessages", async (req, res) => {
    try {
        const { roomid } = req.body;
        const messages = await Message.find({ roomid });
        res.status(200).send(messages)
    } catch (error) {
        res.status(422).json({ message: error.message })

    }
})

router.post("/setusermessages", async (req, res) => {
    try {
        const { ouruserid, fuserid, lastmessage, roomid } = req.body

        const user = await User.findById({ _id: ouruserid })
            (user.allmessages).map((message) => {
                if (item.fuserid === fuserid) {
                    item.allmessages.pull(item.fuserid)
                }
            })
        const date = Date.now();
        (user.allmessages).push({
            ouruserid,
            fuserid,
            lastmessage,
            roomid,
            date
        })
        user.save()
        res.status(200).json({ message: "Message saved" })
    } catch (error) {
        res.status(422).json({ message: error.message })
    }
})

router.post("/getpost", async (req, res) => {
    try {
        const { authorization } = req.headers;

        const token = authorization.replace(process.env.key, "")
        const { _id } = jwt.verify(token, process.env.secret);
        const loginuUser = await User.findById(_id)
        let allPost = [];
        if (loginuUser) {
            for (let username of (loginuUser.followers)) {

                const followedUserPost = await Post.find({ username })

                allPost = allPost.concat(followedUserPost)

            }
            for (let username of (loginuUser.following)) {


                if (!((loginuUser.followers).includes(username))) {
                    const followingUserPost = await Post.find({ username })
                    allPost = allPost.concat(followingUserPost)

                }
            }

            const selfPost = await Post.find({ username: loginuUser.username })


            allPost = allPost.concat(selfPost)

            res.status(200).send(allPost)
        }
        else {
            res.status(403).json({ message: "You must be logged in" })
        }


    } catch (error) {
        res.status(402).json({ message: error.message })
    }
})

router.post("/getusermessages", async (req, res) => {
    try {
        const { id } = req.body

        const user = await User.findById(id)

        res.status(200).send(user.allmessages)
    } catch (error) {
        res.status(422).json({ message: error.message })
    }
})

router.post("/getallposts", async (req, res) => {
    try {
        const posts = await Post.find({ email: req.body.email })

        res.status(200).send(posts)
    } catch (error) {
        res.status(402).json({ message: "Something went wrong" })
    }
})
router.post("/like", async (req, res) => {
    try {
        const { authorization } = req.headers;

        const token = authorization.replace(process.env.key, "")
        const result = jwt.verify(token, process.env.secret);

        const loginuUser = await User.findById(result._id)
        const { _id } = req.body;

        const post = await Post.findById(_id);

        if (post && !((post.likes).includes(loginuUser.username))) {
            (post.likes).push(loginuUser.username);
            post.save()
        }
        else {
            post.likes = (post.likes).filter((username) => {
                if (username != loginuUser.username) {
                    return username;
                }
            })
            post.save();

        }
        res.status(200).json({ message: "Liked", post })
    } catch (error) {

        res.status(402).json({ message: "Something Went Wrong" })

    }
})

router.post("/getComments", async (req, res) => {
    try {
        const { _id } = req.body;

        const post = await Post.findOne({ _id });

        res.status(200).send(post.comments)
    } catch (error) {
        res.status(402).json({ message: "Something Went Wrong" })
    }
})

router.post("/comment", async (req, res) => {
    try {
        const { _id, comment, profilepic, username } = req.body;

        const post = await Post.findOne({ _id });
        (post?.comments)?.push({ comment, profilepic, username })
        post.save();
        res.status(200).send(post)
    } catch (error) {
        res.status(403).json({ message: "Something went wrong" })
    }
})

router.post("/getmessageduser", async (req, res) => {
    try {
        const { _id } = req.body;

        const messages = await Message.find({ senderid: _id });
        let recievers = []
        for (let message of messages) {
            const reciever = await User.findById(message.recieverid);
            if (recievers.length === 0) {
                recievers.push(reciever);
                continue;

            }
            if (!((message.recieverid) === (reciever._id).toString())) {
                recievers.push(reciever);
            }
        }
        res.status(200).send(recievers)
    } catch (error) {
        res.status(403).json({ message: "Something went wrong" })

    }
})

router.post("/getchats_on_keyword", async (req, res) => {
    try {
        const { _id, keyword } = req.body
        //const users = await User.find({ username: { $regex: keyword, $options: 'i' } })
        let recievers = await Message.find({ senderid: _id, reciever_username: { $regex: keyword, $options: 'i' } });


    } catch (error) {
        res.status(403).json({ message: error.message })
    }
})

module.exports = router