import React from "react";
// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { CheckCircle } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../Input";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const meta: Meta<typeof Modal> = {
  title: "Modal",
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

interface PrimaryForm {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

const Schema = z.object({
  password: z.string().min(1),
  newPassword: z.string().min(1),
  confirmPassword: z.string().min(1),
});

export const Primary: Story = {
  args: {
    children: "Click Me",
  },
  parameters: {},
  render: (args) => {
    const [open, setOpen] = React.useState(false);

    const {
      control,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<PrimaryForm>({
      resolver: zodResolver(Schema),
    });
    const onSubmit = (data: PrimaryForm) => console.log(data);
    return (
      <div className="mx-w-7xl flex h-[500px] items-center justify-center">
        <Button
          variant="ghost"
          onClick={() => {
            console.log("OPEN");
            setOpen(true);
          }}
        >
          Click me
        </Button>
        <Modal
          className="max-w-sm"
          open={open}
          onOpenChange={setOpen}
          icon={<CheckCircle className="h-7 w-7 text-success-600" />}
          title="Change Password"
          description="Change your current password to something else."
        >
          <form className="flex flex-col gap-4">
            <div className="flex max-w-5xl flex-row flex-wrap">
              <label
                className="mb-2 text-sm font-medium text-gray-300"
                htmlFor="password"
              >
                Current Password
              </label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input error={errors.password} {...field} />
                )}
              />
              {errors.password && (
                <p className="text-error-600" role="alert">
                  Current password is required
                </p>
              )}
            </div>
            <div className="flex max-w-5xl flex-row flex-wrap">
              <label
                className="mb-2 text-sm font-medium text-gray-300"
                htmlFor="newPassword"
              >
                New password
              </label>
              <Controller
                name="newPassword"
                control={control}
                render={({ field }) => (
                  <Input error={errors.newPassword} {...field} />
                )}
              />
              {errors.newPassword && (
                <p className="text-error-600" role="alert">
                  New password is required
                </p>
              )}
            </div>
            <div className="flex max-w-5xl flex-row flex-wrap">
              <label
                className="mb-2 text-sm font-medium text-gray-300"
                htmlFor="confirmPassword"
              >
                Confirm password
              </label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input error={errors.confirmPassword} {...field} />
                )}
              />
              {errors.confirmPassword && (
                <p className="text-error-600" role="alert">
                  Confirm password is required
                </p>
              )}
            </div>
            <Button className="inline-flex self-start" variant="primary">
              Save
            </Button>
          </form>
        </Modal>
      </div>
    );
  },
};
