import React from "react";
import { Link } from "react-router-dom";
import "./pagenotfound.css";

function PageNotFound() {
  return (
    <section class="page_404">
      <div class="container">
        <div class="row">
          <div class="">
            <div class="text-center">
              <div class="four_zero_four_bg mx-auto">
                <h1 class="text-center">404</h1>
              </div>
              <div class="contant_box_404 w-full">
                <h3 class="h2 text-center">
                  Look like you're lost
                </h3>
                <p>the page you are looking for not avaible!</p>
                <Link to="/" class="link_404">Go to Home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageNotFound;
