import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { TbSquareRoundedCheckFilled } from "react-icons/tb";
import { GiCrossMark } from "react-icons/gi";
import { HiOutlineLockClosed } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const [password, setPassword] = useState("");
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [progress, setProgress] = useState('');

  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false);
  const [hasValidLength, setHasValidLength] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);

  const preventCopyPasting = (
    event: React.ClipboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    toast.warn('copy pasting is not allowed🎃', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1400
    })
  };

  const verifiedList = Object.values({
    hasNumber,
    hasSpecialCharacter,
    hasValidLength,
    hasUppercase,
    hasLowercase,
  }).filter((value) => value);

  useEffect(() => {
    setProgress(`${(verifiedList.length / 5) * 100}%`)
  }, [verifiedList]);

  useEffect(() => {
    //length check
    if (password.length >= 8) {
      setHasValidLength(true);
    } else {
      setHasValidLength(false);
    }
    //special character check
    const patternForSpecial = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
    if (patternForSpecial.test(password)) {
      setHasSpecialCharacter(true);
    } else {
      setHasSpecialCharacter(false);
    }
    //number check
    const patternForNumber = /[0-9]/;
    if (patternForNumber.test(password)) {
      setHasNumber(true);
    } else {
      setHasNumber(false);
    }
    //uppercase check
    const patternForUppercase = /[A-Z]/;
    if (patternForUppercase.test(password)) {
      setHasUppercase(true);
    } else {
      setHasUppercase(false);
    }
    //lowercase check
    const patternForLowercase = /[a-z]/;
    if (patternForLowercase.test(password)) {
      setHasLowercase(true);
    } else {
      setHasLowercase(false);
    }
  }, [password]);

  return (
    <div className="mt-28 grid grid-flow-row place-items-center">
      <main>
        <div className="relative">
          <label>Password</label>
          <HiOutlineLockClosed className="absolute left-4 bottom-6 text-2xl text-slate-700" />
          <input
            className="w-full pl-12"
            type={isHidePassword ? "password" : "text"}
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            onPaste={(e) => preventCopyPasting(e)}
            onCopy={(e) => preventCopyPasting(e)}
            onCut={(e) => preventCopyPasting(e)}
            placeholder="Write your password..."
            autoFocus
          />
          {isHidePassword ? (
            <AiOutlineEyeInvisible
              className="cursor-pointer text-2xl absolute top-11 right-3"
              onClick={() => setIsHidePassword(false)}
            />
          ) : (
            <AiOutlineEye
              className="cursor-pointer text-2xl absolute top-11 right-3"
              onClick={() => setIsHidePassword(true)}
            />
          )}
        </div>
        <div className="bg-slate-50 p-7">
          <h5 className="text-lg font-medium text-purple-950 mb-5">
            Your password must have-
          </h5>
          <div className="flex items-center gap-2 mb-3">
            {hasValidLength ? (
              <TbSquareRoundedCheckFilled className="text-green-500 text-lg" />
            ) : (
              <GiCrossMark className="text-red-500 text-lg" />
            )}
            <p
              className={`${
                hasValidLength ? "text-green-500" : "text-red-500"
              }`}
            >
              8 or more characters
            </p>
          </div>
          <div className="flex items-center gap-2 mb-3">
            {hasUppercase && hasLowercase ? (
              <TbSquareRoundedCheckFilled className="text-green-500 text-lg" />
            ) : (
              <GiCrossMark className="text-red-500 text-lg" />
            )}
            <p
              className={`${
                hasUppercase && hasLowercase ? "text-green-500" : "text-red-500"
              }`}
            >
              Upper & lowercase letters
            </p>
          </div>
          <div className="flex items-center gap-2 mb-3">
            {hasSpecialCharacter ? (
              <TbSquareRoundedCheckFilled className="text-green-500 text-lg" />
            ) : (
              <GiCrossMark className="text-red-500 text-lg" />
            )}
            <p
              className={`${
                hasSpecialCharacter ? "text-green-500" : "text-red-500"
              }`}
            >
              1 special characters (! @ # $ % ^ & *)
            </p>
          </div>
          <div className="flex items-center gap-2 mb-4">
            {hasNumber ? (
              <TbSquareRoundedCheckFilled className="text-green-500 text-lg" />
            ) : (
              <GiCrossMark className="text-red-500 text-lg" />
            )}
            <p className={`${hasNumber ? "text-green-500" : "text-red-500"}`}>
              At least one number
            </p>
          </div>
          {
            password.length ? <div>
            <h5 className="text-lg font-medium text-purple-900">
              Strength: <span className="text-sm ml-1">{verifiedList.length === 5 ? 'Strong' : verifiedList.length >= 3 ? 'Medium' : 'Weak'}</span>
            </h5>
            <div className="mt-2 h-3 relative w-full rounded overflow-hidden">
              <div className="w-full h-full bg-gray-200 absolute"></div>
              <div
                className={`${verifiedList.length === 5 ? 'bg-teal-500' : verifiedList.length >= 3 ? 'bg-yellow-400' : 'bg-pink-500'} h-full absolute`}
                style={{ width: progress }}
              ></div>
            </div>
          </div> : ''
          }
          
        </div>
      </main>
      <ToastContainer/>
    </div>
  );
};

export default App;
