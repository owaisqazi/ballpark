import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line
const NavigatingPark = () => {
  return (
    <>
      {/* Start Breadcrumb Area */}
      <section className="page-area area-120 position-relative">
        <div className="container main-Container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 justify-content-start align-items-center mt-4">
              <div className="breadcrumb-title text-center">
                <div className="white-headline">
                  <h2>
                    Navigating The{" "}
                    <span className="sp-color">Ballpark Tab</span>
                  </h2>
                </div>
              </div>
              <div className="breadcrumb-page">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb ">
                    <li className="breadcrumb-item">
                      <Link to={"/"}>Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Navigating the Park
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div class="background-overlay20"></div>
      </section>
      {/* Start Quote Area */}
      <div className="contact-area bg-color-xs area-padding p-3">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 my-4">
              <h3 className="text-primary fw-bold text-capitalize mt-3 pb-2 col-lg-12 text-start">
               MAKE AN ACCOUNT
        </h3>
              <p>Head over to LOGIN and CREATE A NEW ACCOUNT.</p>
              <p>
                Once you’re all set up head over to NEW PROJECT and name your
                project.
              </p>
              <p>
                Once on the new projects page there are three options to choose
                from. Cost a drawing, project pictures and start a quote.
              </p>
              <h3 className="text-primary fw-bold text-capitalize mt-3 pb-2 col-lg-12 text-start">
               COST A DRAWING
        </h3>
              <p>
                 Putting an end to painstakingly costing your
                technical drawings.
              </p>
              <h4>HOW TO GET THE BEST ESTIMATES FOR YOUR PICTURES</h4>
              <h4>DIMENSIONS ARE A MUST</h4>
              <p>
                Let’s start with the basics: dimensions. Unfortunately, our cost
                engine isn’t psychic (as much as we wish it were). If you want
                an accurate ballpark figure, make sure every measurement is
                clearly marked on your drawing.
              </p>
              <p>
                Even if it’s a simple square, label every side. The engine won’t
                just assume all sides are equal—it needs the facts!
              </p>
              <p>
                We have added a feature that means when you upload a picture you
                can also add on dimensions which may have not been included to
                help with sizing.
              </p>
              <h4>MULTIPLE ANGLES = BETTER RESULTS</h4>
              <p>
                If you can provide more than one angle of your drawing, you’re
                on the right track! Remember, our engine can’t see what’s not
                there.
              </p>
              <p>
                For instance, if you’re designing a double-sided bench but only
                provide one view, how’s it supposed to guess what’s happening on
                the other side? And if there’s no plan view, how can it tell how
                thick it’s supposed to be?
              </p>
              <p>
                You can still submit a single view, but be warned: the less
                detail we have, the broader the estimate—and that means more
                work later on to fine-tune it.
              </p>
              <h4>LABEL YOUR MATERIALS</h4>
              <p>
                Just like you would with a client, make sure to note down the
                materials you’re using. 18mm MDF or 25mm MDF? Trust us, the
                difference matters if you want an accurate quote
              </p>
              <p>
                Check out the examples below to see the difference between a
                solid ballpark estimate and a looser one.
              </p>
              <p>
                Now you know the rules, it's as simple as uploading or dragging
                and dropping the picture into the clearly marked engine. The
                engine will begin crunching numbers and then will give you a
                breakdown of all the materials with quantities and where to
                purchase them. As we mentioned earlier, it’s always a good idea
                to do a quick sense check—especially depending on how detailed
                your drawing was. There is an option to purchase the material
                next to the breakdown.
              </p>
              <p>
                You then label the drawing and click ‘save’ and it will save
                into the ‘Project Pictures’ folder.
              </p>
              <h3 className="text-primary fw-bold text-capitalize mt-3 pb-2 col-lg-12 text-start">
               PROJECT DRAWINGS
        </h3>
              <p>this is where these pictures are stored with their price
estimate.
</p>
<h3 className="text-primary fw-bold text-capitalize mt-3 pb-2 col-lg-12 text-start">
               MAKE A QUOTE
        </h3>
<h4> This is where everything comes together</h4>
<p>If you’re here you’re probably already familiar with the basics of writing a quote but
just incase you’re not: Item (what you're quoting), Quantity (how many you need),
Cost (the price), and Markup (how much you want to add for profit).
</p>
<p>In the Item column, there's a handy dropdown menu. Just click it, and you'll see four
options: PROJECT PICTURES, OFF THE SHELF, MATERIAL, and FREESTYLE.
These options are like turbo boosters for your quoting process, making everything
quicker and easy.
</p>
<h4>DROP DOWN OPTIONS</h4>
<h4>PROJECT PICTURES DROP DOWN
</h4>
<p>This drop down option is where you can easily upload your project picture costs.
Click on it, go to the next cell and type in the name from your saved project pictures.
We'll automatically break things down into materials for you, so you can adjust
quantities, add your own markup, and even purchase everything you need with a
simple click.
</p>
<h4>OFF THE SHELF DROP DOWN</h4>
<p>Let’s be honest, no one wants to spend hours sketching out every single item on a
quote. That’s just extra time we could all use for more exciting things, right?
</p>
<p>That's why we've put together a collection of commonly used unbespoke items you
can easily pop into your quotes. We’ve got everything from standard-sized
canvas-wrapped step and repeats to podiums and flats, and so much more! Each
item comes with a handy breakdown of the materials and where you can get the
material or simply purchase the item off the shelf. Again, there is the option to mark
up these line items anywhere from 1 to 100 percent.
</p>
<p>Certain items come with their own technical drawings. This means that when you
add the item to the quote the matching technical drawing will appear in the projects
folder</p>
<p>We’re always adding new items to this collection, so your quoting process will keep
getting quicker and easier as time goes on.</p>
<h4>BALLPARK 2.0 DROP DOWN:</h4>
<p>
If you haven't checked out our Ballpark 2.0 tab yet, that’s probably worth a look.
<br />
Ballpark 2.0 is an app that links to your account and lets you snap pictures of real-life
objects. It then works its magic to size them up and estimate costs. Just take a few
photos from different angles, and our AI will do its best to break down the materials
and give you a ballpark cost estimate.
<br />
Now, it's not perfect—sometimes it won't get the exact material —but it'll pick the
closest match it can find for you to replicate. And while it can't see the inner workings
of a structure, it does a solid job estimating based on what it can see. So, you might
need to use your builder's intuition to fill in the gaps.
<br />
Once you take a picture of the object on the app click ‘save’ and it will be saved into
the ‘Ballpark 2.0’ tab you saw on the beginning page.
<br />
Later when you’re at your laptop working on the quote you’ll be able to click the
ballpark 2.0 drop down and click ‘memory’ and import the materials from the picture
you took earlier.
</p>
<h3 className="text-primary fw-bold text-capitalize mt-3 pb-2 col-lg-12 text-start">
             MATERIALS
        </h3>
<p>
So, you’re getting ready to dive into your project, but the thought of sketching out a
1220 x 2440mm triangle on Dibond or MDF every single time sounds like a major
hassle, right?
<br />
So, you’re getting ready to dive into your project, but the thought of sketching out a
1220 x 2440mm triangle on Dibond or MDF every single time sounds like a major
hassle, right?
<br />
Lucky for you, once you step into the Ballpark, you’ve got the keys to our entire
material’s costing kingdom. No more researching current prices—we’ve got all the
numbers and locations ready and waiting for you.
<br />
Just hit that ‘Materials’ drop-down, type in your quantities, and voilà! You’re all set
and again with the link for you to purchase it.
<br />
Once your cost is finished and you’re happy with it click save in the top corner. It will
ask you if this document is for external use and if you say yes it will save the PDF
without the markup or purchase column. If the document is for internal use then it will
save as is.
</p>
<h3 className="text-primary fw-bold text-capitalize mt-3 pb-2 col-lg-12 text-start">
               FREESTYLE
        </h3>
<p>This drop down allows you to manually enter whatever you’d like to the quote. For
example your personal install fees or workshop labour etc.
</p>
<h3 className="text-primary fw-bold text-capitalize mt-3 pb-2 col-lg-12 text-start">
               IMPORTANT NOTES
        </h3>
<h4>For Set Build Companies: <p> Got your ballpark cost estimate? Great! Ready to move
forward? Just click ‘purchase’ next to each material, and you’ll be taken directly to
the site where we found the cost. For more bespoke elements—like a custom piece
of metal—we suggest marking up the material cost by 50% again, since you might
need to outsource it.</p></h4>
<h4>For Agencies:<p>  If you’re teaming up with set build companies to bring your designs to
life, remember that these estimates will need a little extra padding—typically
anywhere from 10% to 50%, depending on the company. So, when you’re planning a
budget for an event, we recommend marking it up by 50% just to be safe. And don’t
forget to add a line item for workshop labour, which can vary depending on the
company, as that’s where set builders really earn their keep. When you’re in the
quoting tab, you can easily mark up each line item by 1-99%, depending on your
needs. </p></h4>
            </div>
          </div>
      <br />
      <br />
      <br />
        </div>
      </div>
    </>
  );
};

export default NavigatingPark;
