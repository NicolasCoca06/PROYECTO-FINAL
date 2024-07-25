import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useBets } from "../context/betsContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
dayjs.extend(utc);

export function BetFormPage() {
  const { createBet, getBet, updateBet } = useBets();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        updateBet(params.id, {
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      } else {
        createBet({
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      }

      // navigate("/bets");
    } catch (error) {
      console.log(error);
      // window.location.href = "/";
    }
  };

  useEffect(() => {
    const loadBet = async () => {
      if (params.id) {
        const bet = await getBet(params.id);
        setValue("fixture", bet.fixture);
        setValue("betChoice", bet.betChoice);
        setValue(
          "date",
          bet.date ? dayjs(bet.date).utc().format("YYYY-MM-DD") : ""
        );
        setValue("completed", bet.completed);
      }
    };
    loadBet();
  }, []);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="fixture">Fixture</Label>
        <Input
          type="text"
          name="fixture"
          placeholder="Fixture"
          {...register("fixture")}
          autoFocus
        />
        {errors.fixture && (
          <p className="text-red-500 text-xs italic">Please enter a fixture.</p>
        )}

        <Label htmlFor="betChoice">Bet Choice</Label>
        <Input
          name="betChoice"
          id="betChoice"
          rows="3"
          placeholder="Bet Choice"
          {...register("betChoice")}
        ></Input>

<Label htmlFor="state">State</Label>
        <Input
          name="state"
          id="state"
          rows="3"
          placeholder="State"
          {...register("state")}
        ></Input>

      <Label htmlFor="result">Result</Label>
        <Input
          name="result"
          id="result"
          rows="3"
          placeholder="Result"
          {...register("result")}
        ></Input>

        <Label htmlFor="date">Date</Label>
        <Input type="date" name="date" {...register("date")} />
        <Button>Save</Button>
      </form>
    </Card>
  );
}
