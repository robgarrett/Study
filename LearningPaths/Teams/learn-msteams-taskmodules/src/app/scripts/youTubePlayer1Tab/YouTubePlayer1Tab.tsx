import * as React from "react";
import {
    Provider,
    Flex,
    Text,
    Button,
    Header,
    ThemePrepared,
    teamsTheme,
    teamsDarkTheme,
    teamsHighContrastTheme,
    Input
} from "@fluentui/react-northstar";
import TeamsBaseComponent, { ITeamsBaseComponentState } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";
/**
 * State for the youTubePlayer1TabTab React component
 */
export interface IYouTubePlayer1TabState extends ITeamsBaseComponentState {
    entityId?: string;
    teamsTheme: ThemePrepared;
    youTubeVideoId?: string;
}

/**
 * Properties for the youTubePlayer1TabTab React component
 */
export interface IYouTubePlayer1TabProps {

}

/**
 * Implementation of the YouTube Player 1 content page
 */
export class YouTubePlayer1Tab extends TeamsBaseComponent<IYouTubePlayer1TabProps, IYouTubePlayer1TabState> {

    public async componentWillMount() {
        this.updateComponentTheme(this.getQueryVariable("theme"));
        this.setState(Object.assign({}, this.state, {
            youTubeVideoId: "VlEH4vtaxp4"
        }));


        if (await this.inTeams()) {
            microsoftTeams.initialize();
            microsoftTeams.registerOnThemeChangeHandler(this.updateComponentTheme);
            microsoftTeams.getContext((context) => {
                microsoftTeams.appInitialization.notifySuccess();
                this.setState({
                    entityId: context.entityId
                });
                this.updateTheme(context.theme);
            });
        } else {
            this.setState({
                entityId: "This is not hosted in Microsoft Teams"
            });
        }
    }

    /**
     * The render() method to create the UI of the tab
     */
    public render() {
        return (
            <Provider theme={this.state.teamsTheme}>
                <Flex column gap="gap.smaller">
                    <Header>Task Module Demo</Header>
                    <Text>YouTube Video ID:</Text>
                    <Input value={this.state.youTubeVideoId} disabled></Input>
                    <Button content="Change Video ID" onClick={this.onChangeVideo}></Button>
                    <Button content="Show Video" primary onClick={this.onShowVideo}></Button>
                    <Text content="(C) Copyright Contoso" size="smallest"></Text>
                </Flex>
            </Provider>
        );
    }

    private updateComponentTheme = (currentThemeName: string = "default"): void => {
        let theme: ThemePrepared;

        switch (currentThemeName) {
            case "default":
                theme = teamsTheme;
                break;
            case "dark":
                theme = teamsDarkTheme;
                break;
            case "contrast":
                theme = teamsHighContrastTheme;
                break;
            default:
                theme = teamsTheme;
                break;
        }
        // update the state
        this.setState(Object.assign({}, this.state, {
            teamsTheme: theme
        }));
    }

    private onChangeVideo = (event: React.MouseEvent<HTMLButtonElement>): void => {
        const taskModuleInfo = {
            title: "YouTube Video Selector",
            url: this.appRoot() + `/youTubePlayer1Tab/selector.html?theme={theme}&vid=${this.state.youTubeVideoId}`,
            width: 350,
            height: 150
        };

        const submitHandler = (err: string, result: string): void => {
            this.setState(Object.assign({}, this.state, {
                youTubeVideoId: result
            }));
        };

        microsoftTeams.tasks.startTask(taskModuleInfo, submitHandler);
    }

    private appRoot(): string {
        if (typeof window === "undefined") {
            return "https://{{HOSTNAME}}";
        } else {
            return window.location.protocol + "//" + window.location.host;
        }
    }

    private onShowVideo = (event: React.MouseEvent<HTMLButtonElement>): void => {
        const taskModuleInfo = {
            title: "YouTube Player",
            url: this.appRoot() + `/youTubePlayer1Tab/player.html?vid=${this.state.youTubeVideoId}`,
            width: 1000,
            height: 700
        };
        microsoftTeams.tasks.startTask(taskModuleInfo);
    }
}
