import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
// import {
//   clearAllSoftwareAppErrors,
//   deleteSoftwareApplication,
//   getAllSoftwareApplications,
//   resetSoftwareApplicationSlice,
// } from "@/store/slices/softwareApplicationSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SpecialLoadingButton from "./SpecialLoadingButton";
import {
  getAllTimeline,
  makeTimelineEmpty,
} from "@/store/Slices/timelineSlice";
import {
  getAllApplication,
  makeapplicationsEmpty,
  deleteApplication,
} from "@/store/Slices/softwareApplicationSlice";
import { getAllProjects,makeProjectsEmpty } from "@/store/Slices/projectSlice";
import { getAllSkills,makeSkillsEmpty } from "@/store/Slices/skillsSlice";
const Dashboard = () => {
  const navigateTo = useNavigate();
  const gotoMangeSkills = () => {
    navigateTo("/manage/skills");
  };
  const gotoMangeTimeline = () => {
    navigateTo("/manage/timeline");
  };
  const gotoMangeProjects = () => {
    navigateTo("/manage/projects");
  };

  const { userData } = useSelector((state) => state.auth);
  const timelines = useSelector((state) => state.timeline.timeline);
  const applications = useSelector(
    (state) => state.softwareApplication?.applications
  );
  const deleting = useSelector((state) => state.softwareApplication?.deleting);
  const skills=useSelector((state)=>state.skills.skills);
  const projects=useSelector((state)=>state.projects.projects);

  useEffect(() => {
    dispatch(getAllTimeline());
    dispatch(getAllApplication());
    dispatch(getAllSkills());
    dispatch(getAllProjects());

    return () => {
      dispatch(makeTimelineEmpty());
      dispatch(makeapplicationsEmpty());
      dispatch(makeSkillsEmpty());
      dispatch(makeProjectsEmpty());
    };
  }, []);

  const dispatch = useDispatch();

  const handleDeleteSoftwareApp = (id) => {
    dispatch(deleteApplication({id}));
  };

  return (
    <>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-2">
                <CardHeader className="pb-3">
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    {userData.aboutMe}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button>Visit Portfolio</Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col justify-center">
                <CardHeader className="pb-2">
                  <CardTitle>Projects Completed</CardTitle>
                  <CardTitle className="text-6xl">
                    {/* {projects && projects.length} */}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button onClick={gotoMangeProjects}>Manage Projects</Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col justify-center">
                <CardHeader className="pb-2">
                  <CardTitle>Skills</CardTitle>
                  <CardTitle className="text-6xl">
                    {/* {skills && skills.length} */}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button onClick={gotoMangeSkills}>Manage Skill</Button>
                </CardFooter>
              </Card>
            </div>
            <Tabs>
              <TabsContent>
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Stack
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Deployed
                          </TableHead>
                          <TableHead className="md:table-cell">
                            Update
                          </TableHead>
                          <TableHead className="text-right">Visit</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects && projects.length > 0 ? (
                          projects.map((element) => {
                            return (
                              <TableRow className="bg-accent" key={element._id}>
                                <TableCell>
                                  <div className="font-medium">
                                    {element.title}
                                  </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {element.stack}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  <Badge
                                    className="text-xs"
                                    variant="secondary"
                                  >
                                    {element.deployed}
                                  </Badge>
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  <Link to={`/update/project/${element._id}`}>
                                    <Button>Update</Button>
                                  </Link>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Link
                                    to={element.projectLink}
                                    target="_blank"
                                  >
                                    <Button>Visit</Button>
                                  </Link>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-3xl overflow-y-hidden">
                              You have not added any project.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <Tabs>
              <TabsContent>
                <Card>
                  <CardHeader className="px-7 gap-3">
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="grid sm:grid-cols-2 gap-4">
                    {skills && skills.length > 0 ? (
                      skills.map((element) => {
                        return (
                          <Card key={element._id}>
                            <CardHeader>{element.title}</CardHeader>
                            <CardFooter>
                              <Progress value={element.proficiency} />
                            </CardFooter>
                          </Card>
                        );
                      })
                    ) : (
                      <p className="text-3xl">You have not added any skill.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <Tabs>
              <TabsContent className="grid min-[1050px]:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Software Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead className="md:table-cell">Icon</TableHead>
                          <TableHead className="md:table-cell text-center">
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {applications && applications.length > 0 ? (
                          applications.map((element) => {
                            return (
                              <TableRow className="bg-accent" key={element._id}>
                                <TableCell className="font-medium">
                                  {element.name}
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  <img
                                    className="w-7 h-7"
                                    src={element.svg && element.svg.url}
                                    alt={element.name}
                                  />
                                </TableCell>
                                <TableCell className="md:table-cell  text-center">
                                  {deleting ? (
                                    <SpecialLoadingButton
                                      content={"Deleting"}
                                      width={"w-fit"}
                                    />
                                  ) : (
                                    <Button
                                      onClick={() =>
                                        handleDeleteSoftwareApp(element?._id)
                                      }
                                    >
                                      Delete
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-3xl overflow-y-hidden">
                              You have not added any Software Application.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="px-7 flex items-center justify-between flex-row">
                    <CardTitle>Timeline</CardTitle>
                    <Button onClick={gotoMangeTimeline} className="w-fit">
                      Manage Timeline
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="md:table-cell">From</TableHead>
                          <TableHead className="md:table-cell text-right">
                            To
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timelines && timelines.length > 0 ? (
                          timelines.map((element) => {
                            return (
                              <TableRow className="bg-accent" key={element._id}>
                                <TableCell className="font-medium">
                                  {element.title}
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  {element.timeline.from}
                                </TableCell>
                                <TableCell className="md:table-cell  text-right">
                                  {element.timeline.to}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-3xl overflow-y-hidden">
                              You have not added any timeline.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
