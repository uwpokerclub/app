import React from "react"

export default function LoginCreate() {
  const message = "";

  return (
    <div className="center">
      
      {
        message &&
        <div role="alert" className="alert alert-danger">
          <span>{message}</span>
        </div>
      }

      <h1>
        Create a Login
      </h1>

      <div class="row">

        <div class="col-md-4 col-lg-4 col-sm-3" />

        <div class="col-md-4 col-lg-4 col-sm-6">
          <form onSubmit={loginCreate} className="content-wrap">
            
            <div className="form-group">
              <label for="username">
                Username:
              </label>
              <input type="text" name="username" className="form-control" />
            </div>

            <div className="form-group">
              <label for="password">
              Password:
              </label>
              <input type="password" name="password" className="form-control" />
            </div>

            <button type="submit" className="btn btn-success">
              Create
            </button>

          </form>
        </div>

        <div class="col-md-4 col-lg-4 col-sm-3" />

      </div>
    </div>
  )
}

const loginCreate = () => {
  return ;
}
