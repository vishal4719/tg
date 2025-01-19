const db = require("../models"); // Ensure this points to your database configuration
const signup = db.signup; // Signup model
const generateUID = (yearOfAdmission, branch, division, rollNumber) => {
    const year = yearOfAdmission?.toString().slice(-2); // Get the last two digits of the year
    const formattedBranch = branch?.toUpperCase(); // Convert branch to uppercase
    const formattedDivision = division?.toUpperCase(); // Convert division to uppercase
    return `${year}-${formattedBranch}${formattedDivision}-${rollNumber}`;
};

// Function to create a new user
exports.create = (req, res) => {
    console.log(req.body);

    // Validate request
    if (!req.body.student_name ||
        !req.body.gender ||
        !req.body.stud_phone_no ||
        !req.body.stud_email ||
        !req.body.Branch ||
        !req.body.Division ||
        !req.body.roll_no ||
        !req.body.father_name ||
        !req.body.father_phone_no ||
        !req.body.mother_name ||
        !req.body.mother_phone_no ||
        !req.body.year_of_admission ||
        !req.body.pincode ||
        !req.body.surname ||
        !req.body.student_address) {
        return res.status(400).send({
            message: "Content cannot be empty! Please fill all mandatory fields."
        });
    }

    // Create a user object
    const user = {
        student_name: req.body.student_name,
        surname: req.body.surname,
        gender: req.body.gender,
        stud_phone_no: req.body.stud_phone_no,
        stud_email: req.body.stud_email,
        branch: req.body.Branch,
        division: req.body.Division,
        roll_no: req.body.roll_no,
        father_name: req.body.father_name,
        father_email: req.body.father_email || null, // Optional field
        parent_phone_no: req.body.father_phone_no,
        mother_name: req.body.mother_name,
        mother_email: req.body.mother_email || null, // Optional field
        mother_phone_no: req.body.mother_phone_no,
        year_of_admission: req.body.year_of_admission,
        student_address: req.body.student_address,
        pincode: req.body.pincode
    };
    user.UID = generateUID(
        req.body.year_of_admission,
        req.body.Branch,
        req.body.Division,req.body.roll_no
    );

    // Save user to the database
    signup.create(user).then(data => {
            db.dashboard.create({
                student_foregin_id: data.id
            }).then(() => {
                res.status(201).json({
                    message: "User created successfully!",
                    userId: data.UID
                });
            });
           
        })
        .catch(err => {
            console.error("Error creating user:", err);
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user."
            });
        });
};