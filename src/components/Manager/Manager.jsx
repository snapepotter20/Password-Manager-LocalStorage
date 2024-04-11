import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const passwordToggleRef = useRef();
  const passwordShowRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const toggleVisibility = () => {
    if (passwordToggleRef.current.src.includes("/closeeye.png")) {
      passwordToggleRef.current.src = "/openeye2.png";
      passwordShowRef.current.type = "text";
    } else {
      passwordToggleRef.current.src = "/closeeye.png";
      passwordShowRef.current.type = "password";
    }
  };

  const saveFormData = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = (e) => {
    e.preventDefault();
    const { site, username, password } = form;
    if (site === "" || username === "" || password === "") {
      toast.error("Please fill all the fields");
    }
    else {
    setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
    );
    console.log("Passwords", [...passwordArray, form]);
    setForm({ site: "", username: "", password: "" });
    toast.success("Password added");
    }
  };
  const deletePassword = (id) => {
    let confirmDelete = confirm("Do you really want to delete this password");
    if (confirmDelete) {
      setPasswordArray(passwordArray.filter((item) => item.id != id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id != id))
      );
      toast.success("Password deleted");
    }
  };
  const editPassword = (id) => {
    setForm(passwordArray.filter((item) => item.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id != id));
  };

  const copyText = (text) => {
    toast("Text copied!");
    navigator.clipboard.writeText(text);
  };

  return (
    <div
      className="min-h-screen pb-8"
      style={{
        background:
          "conic-gradient(at center top, rgb(254, 240, 138), rgb(167, 243, 208), rgb(254, 240, 138))",
      }}
    >
      <div className="flex flex-col items-center justify-center py-12">
        <div className="flex flex-col items-center justify-center text-green-700 p-3 mb-8">
          <h1 className="font-bold text-5xl m-2">Jumbo Lock</h1>
          <p className="font-semibold text-2xl m-2">
            Make you passwords safe with Password Jumbo
          </p>
        </div>
        <div className="m-3  shadow-xl w-[70%] text-gray-600 rounded-xl">
          <input
            type="text"
            className="rounded-xl p-2 w-full"
            placeholder="Enter Website URL"
            name="site"
            value={form.site}
            onChange={saveFormData}
          />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center m-3 gap-4 w-[70%] text-gray-600 rounded-xl">
          <input
            type="text"
            className=" rounded-xl p-2 shadow-xl w-full md:w-[60%]"
            placeholder="Enter Username"
            name="username"
            value={form.username}
            onChange={saveFormData}
          />
          <div className="relative w-full md:w-[40%]">
            <input
              type="password"
              className=" rounded-xl p-2 shadow-xl w-full"
              placeholder="Enter Password"
              name="password"
              value={form.password}
              onChange={saveFormData}
              ref={passwordShowRef}
            />
            <img
              className="absolute top-1 right-3 cursor-pointer"
              src="/closeeye.png"
              onClick={toggleVisibility}
              ref={passwordToggleRef}
            />
          </div>
        </div>
        <div>
          <button
            className="flex items-center justify-center gap-4 p-2 px-4 my-4 bg-green-400 rounded-3xl hover:bg-green-500"
            onClick={savePassword}
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            <span>Save Password</span>
          </button>
        </div>
      </div>
      <div className="w-[80%] m-auto">
        <h2 className="text-xl font-bold my-8 text-green-700">
          Your Passwords
        </h2>
        {passwordArray.length === 0 ? (
          <div className="text-xl text-gray-800 flex gap-4 items-center">
            <span> No Passwords to show </span>
            <img src="/sad-face.png" alt="face frown" className="text-white" />
          </div>
        ) : (
          <div className=" overflow-scroll lg:overflow-auto">
            <table className="table-auto w-full my-2 text-start overflow-scroll">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="py-2 px-6 md:px-2 w-10">Site</th>
                  <th className="py-2 px-6 md:px-2 w-10">Username</th>
                  <th className="py-2 px-6 md:px-2 w-10">Password</th>
                  <th className="py-2 px-6 md:px-2 w-10">Update</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 bg-green-100">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center w-32 py-4">
                      <div className="flex items-center justify-center gap-4">
                        <span> {item.site}</span>
                        <img
                          src="/copy.gif"
                          alt="copy"
                          className="w-10 h-10 cursor-pointer"
                          onClick={() => copyText(item.site)}
                        />
                      </div>
                    </td>
                    <td className="text-center w-32 py-4">
                      <div className="flex items-center justify-center gap-4">
                        <span>{item.username}</span>
                        <img
                          src="/copy.gif"
                          alt="copy"
                          className="w-10 h-10 cursor-pointer"
                          onClick={() => copyText(item.username)}
                        />
                      </div>
                    </td>
                    <td className="text-center w-32 py-4">
                      <div className="flex items-center justify-center gap-4">
                        <span>{"*".repeat(item.password.length)}</span>
                        <img
                          src="/copy.gif"
                          alt="copy"
                          className="w-10 h-10 cursor-pointer"
                          onClick={() => copyText(item.password)}
                        />
                      </div>
                    </td>
                    <td className="text-center w-32 py-4">
                      <div className="flex items-center justify-center gap-6">
                        <img
                          src="/pencil.png"
                          alt="edit"
                          className="w-5 h-5 cursor-pointer"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        />
                        <img
                          src="/trashbin.png"
                          alt="delete"
                          className="w-5 h-5 cursor-pointer"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Manager;
