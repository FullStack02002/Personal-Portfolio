import React, { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getProjectById, makeProjectEmpty } from "@/store/Slices/projectSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const ViewProject = () => {
  const { id } = useParams();
  const dispatch=useDispatch();
  const project=useSelector((state)=>state.projects.project);


  useEffect(() => {
    if (id) {
      dispatch(getProjectById({id}));
    }

    return () => {
      dispatch(makeProjectEmpty());
    };
  }, []);

  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  const descriptionList = project?.description?.split(". ") || [];
  const technologiesList = project?.technologies?.split(", ") || [];

  return (
    <>
      <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
        <div className="w-[100%] px-5 md:w-[1000px] pb-5">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="flex justify-end">
                <Button onClick={handleReturnToDashboard}>
                  Return to Dashboard
                </Button>
              </div>
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <h1 className="text-2xl font-bold mb-4">{project?.title}</h1>
                  <img
                    src={project?.projectBanner ? project?.projectBanner?.url : "/avatarHolder.jpg"}
                    alt="projectBanner"
                    className="w-full h-auto"
                  />
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Description:</p>
                  <ul className="list-disc">
                    {descriptionList.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Technologies:</p>
                  <ul className="list-disc">
                    {technologiesList.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Stack:</p>
                  <p>{project?.stack}</p>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Deployed:</p>
                  <p>{project?.deployed}</p>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Github Repository Link:</p>
                  <Link
                    className="text-sky-700"
                    target="_blank"
                    to={project?.gitRepoLink}
                  >
                    {project?.gitRepoLink}
                  </Link>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Project Link:</p>
                  <Link
                    className="text-sky-700"
                    target="_blank"
                    to={project?.projectLink}
                  >
                    {project?.projectLink}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProject;
