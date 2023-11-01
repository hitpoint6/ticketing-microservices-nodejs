import { useState } from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { doRequest, errors } = useRequest({
        url: "/api/users/signin",
        method: "post",
        body: {
            email, password
        },
        onSucess: () => {
            Router.push('/');
        }
    })

    const onSubmit = async (event) => {
        event.preventDefault();

        await doRequest();
    }

    return (
        <form onSubmit={onSubmit} className="container-sm">
            <h1>Sign In</h1>
            <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)} className="form-control" />
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password" className="form-control" />
            </div>
            {errors}
            <button className="btn btn-primary">Sign In</button>
        </form>
    )
}

export default SignUp;