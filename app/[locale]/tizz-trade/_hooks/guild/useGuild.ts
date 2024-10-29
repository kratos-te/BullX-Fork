"use client";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import {
  CreateGuildDto,
  createGuild,
} from "@/tizz-trade-actions/client/guild/guild/createGuild";
import {
  GuildApiError,
  IGuildMembershipAction,
  IGuild,
  IGuildWithAggregation,
} from "@/types/index";
import { sendGuildInvitationRequest } from "@/tizz-trade-actions/client/guild/guild/sendGuildInvitationRequest";
import { InvitationRequestDto } from "@/tizz-trade-actions/client/guild/guild/sendGuildInvitationRequest";
import { JoinGuildDto } from "@/tizz-trade-actions/client/guild/guild/createGuildJoinRequest";
import { createGuildJoinRequest } from "@/tizz-trade-actions/client/guild/guild/createGuildJoinRequest";
import {
  AcceptInvitationRequestDto,
  acceptGuildInvitationRequest,
} from "@/tizz-trade-actions/client/guild/guild/acceptGuildInvitationRequest";
import { declineGuildInvitationRequest } from "@/tizz-trade-actions/client/guild/guild/declineGuildInvitationRequest";
import { declineGuildJoinRequest } from "@/tizz-trade-actions/client/guild/guild/declineGuildJoinRequest";
import { acceptGuildJoinRequest } from "@/tizz-trade-actions/client/guild/guild/acceptGuildJoinRequest";
import {
  KickGuildDto,
  kickGuild,
} from "@/tizz-trade-actions/client/guild/guild/kickGuild";
import { GuildMember } from "@/tizz-trade-actions/client/guild/guild/leaveGuild";

export function useGuild() {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  const createGuildMutation = useMutation<
    IGuild,
    GuildApiError,
    CreateGuildDto
  >({
    mutationFn: createGuild,
    onSuccess: (newGuild: IGuild) => {},
  });
  const kickUserMutation = useMutation<
    GuildMember,
    GuildApiError,
    KickGuildDto
  >({
    mutationFn: kickGuild,
    onSuccess: (kickedMember: GuildMember) => {
      queryClient.setQueryData<IGuildWithAggregation>(
        ["getGuildById", kickedMember.guild_id],
        (data) => {
          if (!data) {
            return data;
          }

          return {
            ...data,
            guildMembers: data.guildMembers.filter(
              (item) => item.user_id !== kickedMember.user_id,
            ),
          };
        },
      );
    },
    onError: (error) => {
      enqueueSnackbar(
        error.message?.join("\n") ||
          error.error ||
          "Failed at kicking invitation",
        {
          persist: false,
          variant: "error",
        },
      );
    },
  });
  const sendInvitationMutation = useMutation<
    IGuildMembershipAction,
    GuildApiError,
    InvitationRequestDto
  >({
    mutationFn: sendGuildInvitationRequest,
    onSuccess: (newGuild: IGuildMembershipAction) => {},
  });
  const acceptInvitationMutation = useMutation<
    boolean,
    GuildApiError,
    AcceptInvitationRequestDto
  >({
    mutationFn: acceptGuildInvitationRequest,
    onSuccess: (result, variables) => {
      if (result) {
        const action = variables.action;

        queryClient.setQueryData<IGuildMembershipAction[]>(
          ["getInvitationRequests", action.user_id],
          (data) => {
            if (!data) {
              return data;
            }

            return data.map((item) => {
              if (item.action_id === action.action_id) {
                return {
                  ...item,
                  status: "ACCEPTED",
                };
              } else {
                return item;
              }
            });
          },
        );
      }
    },
    onError: (error) => {
      enqueueSnackbar(
        error.message?.join("\n") ||
          error.error ||
          "Failed at accepting invitation",
        {
          persist: false,
          variant: "error",
        },
      );
    },
  });
  const denyInvitationMutation = useMutation<
    boolean,
    GuildApiError,
    AcceptInvitationRequestDto
  >({
    mutationFn: declineGuildInvitationRequest,
    onSuccess: (result, variables) => {
      if (result) {
        const action = variables.action;

        queryClient.setQueryData<IGuildMembershipAction[]>(
          ["getInvitationRequests", action.user_id],
          (data) => {
            if (!data) {
              return data;
            }

            return data.map((item) => {
              if (item.action_id === action.action_id) {
                return {
                  ...item,
                  status: "REJECTED",
                };
              } else {
                return item;
              }
            });
          },
        );
      }
    },
    onError: (error) => {
      enqueueSnackbar(
        error.message?.join("\n") ||
          error.error ||
          "Failed at declining invitation",
        {
          persist: false,
          variant: "error",
        },
      );
    },
  });
  const createJoinRequestMutation = useMutation<
    IGuildMembershipAction,
    GuildApiError,
    JoinGuildDto
  >({
    mutationFn: createGuildJoinRequest,
    onSuccess: (newGuild: IGuildMembershipAction) => {},
  });
  const acceptJoinMutation = useMutation<
    boolean,
    GuildApiError,
    AcceptInvitationRequestDto
  >({
    mutationFn: acceptGuildJoinRequest,
    onSuccess: (result, variables) => {
      if (result) {
        const action = variables.action;

        queryClient.setQueryData<IGuildMembershipAction[]>(
          ["getJoinRequests", action.guild_id],
          (data) => {
            if (!data) {
              return data;
            }

            return data.map((item) => {
              if (item.action_id === action.action_id) {
                return {
                  ...item,
                  status: "ACCEPTED",
                };
              } else {
                return item;
              }
            });
          },
        );

        queryClient.setQueryData<IGuildWithAggregation>(
          ["getGuildById", action.guild_id],
          (data) => {
            if (!data) {
              return data;
            }

            return {
              ...data,
              guildMembers: [
                ...data.guildMembers.filter(
                  (item) => item.user_id !== action.user_id,
                ),
                {
                  guild: {
                    guild_id: data.guild_id,
                    name: data.name,
                    picture: data.picture,
                    created_at: data.created_at,
                    updated_at: data.updated_at,
                  },
                  joined_at: new Date().toString(),
                  is_active: true,
                  user_id: action.user_id,
                  wallet_address: "",
                },
              ],
            };
          },
        );
      }
    },
    onError: (error) => {
      enqueueSnackbar(
        error.message?.join("\n") ||
          error.error ||
          "Failed at accepting join request",
        {
          persist: false,
          variant: "error",
        },
      );
    },
  });
  const denyJoinMutation = useMutation<
    boolean,
    GuildApiError,
    AcceptInvitationRequestDto
  >({
    mutationFn: declineGuildJoinRequest,
    onSuccess: (result, variables) => {
      if (result) {
        const action = variables.action;

        queryClient.setQueryData<IGuildMembershipAction[]>(
          ["getJoinRequests", action.guild_id],
          (data) => {
            if (!data) {
              return data;
            }

            return data.map((item) => {
              if (item.action_id === action.action_id) {
                return {
                  ...item,
                  status: "REJECTED",
                };
              } else {
                return item;
              }
            });
          },
        );
      }
    },
    onError: (error) => {
      enqueueSnackbar(
        error.message?.join("\n") ||
          error.error ||
          "Failed at declining invitation",
        {
          persist: false,
          variant: "error",
        },
      );
    },
  });

  return {
    createGuildMutation,
    createJoinRequestMutation,
    acceptJoinMutation,
    denyJoinMutation,
    sendInvitationMutation,
    acceptInvitationMutation,
    denyInvitationMutation,
    kickUserMutation,
  };
}
