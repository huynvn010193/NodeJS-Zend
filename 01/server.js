const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "Course 1" },
  { id: 2, name: "Course 2" },
  { id: 3, name: "Course 3" },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course not found");
  res.send(course);
});

app.post("/api/courses/add", (req, res) => {
  console.log(req.body);
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(
    JSON.stringify({
      success: true,
      message: "Course added successfully",
      data: courses,
    }),
  );
});

app.put("/api/courses/edit/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course not found");
  course.name = req.body.name;
  res.send(
    JSON.stringify({
      success: true,
      message: "Course updated successfully",
      data: courses,
    }),
  );
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
