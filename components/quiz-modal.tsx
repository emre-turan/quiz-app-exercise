import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const QuizModal = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Marvel Comics</CardTitle>
        <CardDescription>
          Test your knowledge on Marvel Comics! Click the button below to start
          the quiz.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-lg">
        <p>
          Test your knowledge on Marvel Comics! Click the button below to start
          the quiz.
        </p>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4" variant="outline">
              Start Quiz
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Question 1</DialogTitle>
              <DialogDescription>
                Choose the correct answer from the options below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Button>Option 1</Button>
              <Button>Option 2</Button>
              <Button>Option 3</Button>
              <Button>Option 4</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default QuizModal;
