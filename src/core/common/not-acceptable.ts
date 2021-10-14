import { ApiProperty } from "@nestjs/swagger";

export class NotAcceptable {
    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    message: string;

    @ApiProperty()
    error: string;
}