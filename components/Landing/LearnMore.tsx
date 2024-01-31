import React from "react";

function LearnMore() {
  return (
    <section id="LearnMore" className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
            What is Vita log?
          </h2>
          <p className="mt-4 max-w-2xl text-xl leading-7 text-gray-500 lg:mx-auto">
            A hassle-free, daily note taking service that provides generalized
            feedback on your nutritional intake.
          </p>
        </div>

        <div className="mt-10">
          <ul className="md:grid md:grid-cols-2 gap-8">
            <li>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-vita-green text-white"></div>
                </div>
                <div className="ml-4">
                  <h5 className="text-lg leading-6 font-medium text-gray-900">
                    Log What You Eat Daily
                  </h5>
                  <p className="mt-2 text-base leading-6 text-gray-500">
                    Add a simple daily log of your meals without the need for
                    detailed nutritional information. Whether it&apos;s
                    breakfast, lunch, dinner, or snacks, jot it down and you are
                    done for the day.
                  </p>
                </div>
              </div>
            </li>

            <li>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-vita-green text-white"></div>
                </div>
                <div className="ml-4">
                  <h5 className="text-lg leading-6 font-medium text-gray-900">
                    Get Generalized Feedback
                  </h5>
                  <p className="mt-2 text-base leading-6 text-gray-500">
                    Receive feedback on your eating habits with our daily,
                    weekly, and monthly (coming soon) summaries.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default LearnMore;
